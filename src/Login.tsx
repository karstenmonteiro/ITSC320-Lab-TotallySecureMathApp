import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
/**
 * CHANGE: Installed 'react-native-encrypted-storage', which provides a secure and easy way to store data locally on the device.
 */
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * CHANGE: API SERVER CONFIGURATION
 * 
 *    *** NOTE: MUST CHANGE THE IP TO YOUR IP ADDRESS!! (may also need to change the port to one that's open)
 */
const IP = '192.168.1.88'; // set to your own IP address!
const PORT = 3000;
const ADDRESS = IP + ':' + PORT;

export interface IUser {
	username: string;
	password: string;
	token: string;
}

interface IProps {
	onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

export default function Login(props: TProps) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	/**
	 * CHANGE: Updated the login() function to securely store (in EncryptedStorage) and use tokens when authenticating a user on login.
	 */
	async function login() {
		const foundUser = await authenticateUser(username, password);
		if (foundUser) {
			/**
			 * Securely store the token
			 */
			await EncryptedStorage.setItem('userToken', foundUser.token);
			props.onLogin(foundUser);
		} else {
			Alert.alert('Error', 'Username or password is invalid.');
		}
	}

	/**
	 * CHANGE: Implemented an 'authenticateUser' function that authenticates users on login
	 */
	async function authenticateUser(username: string, password: string): Promise<IUser | false> {
		/**
		 * Call the backend authentication API server (**ENSURE YOU UPDATED THE IP ADDRESS TO YOUR OWN IP!!)
		 */
		try {
			const response = await fetch(`http://${ADDRESS}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				const { token } = await response.json();
				return { username, password, token };
			}
		} catch (error) {
			console.error('Authentication error:', error);
		}

		return false;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/>
			<TextInput
				style={styles.password}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				/**
				 * CHANGE: Added 'secureTextEntry' to hide the password that the user enters 
				 */
				secureTextEntry={true}
			/>
			<Button color="#0068dc" title="Login" onPress={login} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#0096ff10',
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#161616',
	},
	username: {
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#161616',
		backgroundColor: '#16161620',
		padding: 10,
		marginBottom: 10,
	},
	password: {
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#161616',
		backgroundColor: '#16161620',
		padding: 10,
		marginBottom: 20,
	}
});