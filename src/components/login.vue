<template>
  <nav class="navbar">
    <div class="logo">
      <span class="logo-text">Uber</span>
    </div>
    <!-- Add any navigation links or items here -->
  </nav>
  <div class="form-wrap">
    <form class="register" @submit.prevent="handleLogin">
      <p class="login-register bold-text">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'register' }">Register</router-link>
      </p>
      <h2 class="bold-text">LogIn Your UBER Account</h2>
      <div class="inputs">
        <!-- <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div> -->
        <!-- <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div> -->
        <!-- <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div> -->
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <!-- <div class="input">
          <input type="password" placeholder="confirmPassword" v-model="password" />
          <password class="icon" />
        </div> -->
        <!-- <div v-show="error" class="error">{{ this.errorMsg }}</div> -->
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
      <button @click.prevent="handleSigninWithGoogle" class="google-button">Sign Up with Google</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>




<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, getDocs, setDoc, getDoc, doc, getFirestore } from 'firebase/firestore';
import { db, app } from '../firebase.js'; // Import messaging from firebase.js
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
// import { useStore } from '@/store';

export default {
  data() {
    return {
      showPassword: false,
    };
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    // const store = useStore();
    const showForgotPasswordSection = ref(false);
    const forgotEmail = ref('');
    const auth = getAuth(app)

    // const toggleForgotPasswordSection = () => {
    //   showForgotPasswordSection.value = !showForgotPasswordSection.value;
    // };
    // const handleForgotPassword = async () => {
    //   try {
    // const auth = getAuth(app);
    // const email = forgotEmail.value;

    // Send the password reset email
    // await sendPasswordResetEmail(auth, email);

    // Password reset email sent successfully
    // const resetLink = 'https://mail.google.com'; // Replace with your actual password reset link

    // Display SweetAlert with a clickable link
    // Swal.fire({
    //   title: 'Password Reset Email Sent',
    //   html: `Password reset email sent. Please check your inbox. Click <a href="${resetLink}" target="_blank" style="color: blue; text-decoration: underline;">here</a> to reset your password.`,
    //   icon: 'success',
    // });

    // Clear the input field
    // forgotEmail.value = '';

    // Hide the forgot password section
    //   showForgotPasswordSection.value = false;
    // } catch (error) {
    //   console.error('Error sending password reset email:', error);
    // alert('Failed to send password reset email. Please try again.');
    //     Swal.fire({
    //       title: 'Failed to send password reset email.',
    //       html: 'Please crosscheck the email',
    //       icon: 'error',
    //     })

    //     forgotEmail.value = '';
    //   }
    // };


    // On component mount, check if the username is stored in local storage
    onMounted(() => {
      if (localStorage.getItem('user')) {
        router.push('/home');
      }
    });

    const handleLogin = async () => {
      try {
        // Check if the user credentials exist in Firestore
        const usersCollection = collection(db, 'Rider');
        const q = query(usersCollection, where('email', '==', email.value));
        const querySnapshot = await getDocs(q);

        let foundUser = null;
        // let access_token = null

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.password === password.value) {
            foundUser = user;
            user['uid'] = doc.id;
          }
        });

        if (!foundUser) {
          // User credentials not found or password is incorrect
          if (querySnapshot.size > 0) {
            Swal.fire({
              title: 'Incorrect Password',
              html: 'Please crosscheck the password',
              icon: 'error',
            })
          } else {
            Swal.fire({
              title: 'No User registered with this Email',
              html: 'Please crosscheck the Email',
              icon: 'error',
            })
          }
        } else if (!foundUser.email || foundUser.email.length === 0) {
          alert("The Email ID cannot be empty!");
        } else {
          // User credentials matched, route to movies page
          // store.setUsername(foundUser.username, foundUser.uid);

          // Store the username in local storage
          localStorage.setItem('user', JSON.stringify(foundUser));
          // localStorage.setItem('access_token', access_token);
          // Get FCM token and store in Firestore
          // const userDocRef = doc(usersCollection, foundUser.uid);
          // const token = await messaging.getToken();
          // await setDoc(userDocRef, { fcmToken: token }, { merge: true });
          router.push('/home');
        }
      } catch (error) {
        console.log('Error logging in:', error);
        alert('Failed to log in. Please try again.');
      }
    };


    const handleSigninWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("access_token", JSON.stringify(token));
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userImage", JSON.parse(localStorage.getItem("user")).photoURL);
        // Redirect or perform other actions

        router.push("/home");

        const firestore = getFirestore();
        const usersCollectionRef = collection(firestore, "Rider");
        const userDocRef = doc(usersCollectionRef, user.uid);

        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          // Create the user document in Firestore if it doesn't exist
          await setDoc(userDocRef, {
            name: user.displayName,
            email: user.email,
            // Add more fields as needed
          });
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, ": ", errorMessage);
        const email = error.customData.email;
        console.log("Email: ", email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("AuthCredential: ", credential);
        // Handle error
      }
    };

    return {
      email,
      password,
      handleLogin,
      handleSigninWithGoogle,
      showForgotPasswordSection,
      forgotEmail,
      // toggleForgotPasswordSection,
      // handleForgotPassword,
    };
  },
};
</script>






<style lang="scss" scoped>
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;

      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/backgrnd.jpg");
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}

.register {
  h2 {
    max-width: 350px;
  }
}

.signup-button,
.google-button {
  display: block;
  width: 280px;
  padding: 12px;
  margin-top: 16px;
  background-color: #000;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

.signup-button:hover,
.google-button:hover {
  background-color: #333;
}

.signup-button:active,
.google-button:active {
  transform: scale(0.95);
  box-shadow: none;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #000;
  color: white;
  z-index: 1000;
  /* Ensure the navbar is above other content */
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>