import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { auth } from '../config/firebase'
const backImage = require('../../assets/images/backImage.jpg')

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log('user', user)
          // navigation.navigate('CreditCard')
        })
        .catch((error) => {
          const errorMessage = error.message
          Alert.alert('Register Error', errorMessage)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />

      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Regístrate</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu Nombre"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="givenName"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Escribe tu Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Escribe tu Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={styles.loginButton}>Regístrate</Text>
        </TouchableOpacity>

        <View style={styles.accountView}>
          <Text style={styles.textAccount}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.registerText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0891b2',
    alignSelf: 'center',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover'
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 60
  },
  button: {
    backgroundColor: '#0891b2',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  loginButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  accountView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textAccount: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14
  },
  registerText: {
    color: '#0891b2',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 5
  }
})