import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: 'AIzaSyAPstTsXFKtlRyC5XnfE71A1PBwQGPhuNY',
    authDomain: 'arboreal-vision-339901.firebaseapp.com',
    projectId: 'arboreal-vision-339901',
    storageBucket: 'arboreal-vision-339901.appspot.com',
    messagingSenderId: '983150008719',
    appId: '1:983150008719:web:094b902dc0e51ab27dd3fa',
    measurementId: 'G-B6DZFY6PQS'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)


