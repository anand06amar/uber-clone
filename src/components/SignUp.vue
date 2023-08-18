<template>
  <nav class="navbar">
    <div class="logo">
      <span class="logo-text">Uber</span>
    </div>
    <!-- Add any navigation links or items here -->
  </nav>
  <div class="form-wrap">
    <form class="register" @submit.prevent="handleSubmit">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'login' }">Login</router-link>
      </p>
      <h2 class="bold text">Create Your UBER Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div>
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
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
      <button @click.prevent="googleSignUp" class="google-button">Sign Up with Google</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>


<script setup>
// import swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import { app } from '../firebase.js';
import { useRouter } from 'vue-router';
import { collection, addDoc, getDocs, query, where, doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { storeToRefs } from 'pinia';
// import { useStore } from '@/store';

// const showPassword = ref(false);
const username = ref('');
const email = ref('');
const password = ref('');
// const confirmPassword = ref('');
const router = useRouter();
const isUserAlreadyRegistered = ref(false);
const auth = getAuth(app)
// const store = useStore();
onMounted(() => {
  if (localStorage.getItem('user')) {
    router.push('/home');
  }
});


const handleSubmit = async () => {
  if (username.value !== '' && email.value !== '' && password.value !== '') {
    try {
      const newUser = {
        displayName: username.value,
        email: email.value,
        password: password.value,
      };

      const querySnapshot = await getDocs(query(collection(db, 'Rider'), where('email', '==', email.value)));

      if (!querySnapshot.empty) {
        isUserAlreadyRegistered.value = true;
        return;
      }

      const docRef = await addDoc(collection(db, 'Rider'), newUser);
      localStorage.setItem('user', JSON.stringify(newUser))
      console.log('User data stored successfully. Document ID:', docRef.id);
      localStorage.setItem("access_token", docRef.id)
      // const gender = Math.random() < 0.5 ? "men" : "women";
      // const randomIndex = Math.floor(Math.random() * 100) + 1;
      // localStorage.setItem('userImage', `https://randomuser.me/api/portraits/${gender}/${randomIndex}.jpg`)
      router.push('/home');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }
  // else if (password.value !== confirmPassword.value) {
  // //   swal.fire({
  //     title: "Confirm Password",
  //     html: "Password and confirm Password must be the same",
  //     icon: "info"
  //   })
  // } 
  else if (username.value === '') {
    alert("Username must be provided");
  }
};



const googleSignUp = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    localStorage.setItem("access_token", JSON.stringify(token));
    const user = result.user;
    localStorage.setItem("Rider", JSON.stringify(user));
    localStorage.setItem("userImage", JSON.parse(localStorage.getItem("Rider")).photoURL);

    router.push("/home");

    const firestore = getFirestore();
    const usersCollectionRef = collection(firestore, "Users");
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
</style>