import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
/**
 * CHANGES: (1) Installed 'mathjs' by executing: 'npm install mathjs'
 * 		    (2) Imported 'evaluate' from 'mathjs' to use instead of the 'eval()' function (which can execute arbitrary code)
 */
import { evaluate } from 'mathjs';

interface IProps {
	title: string;
	text: string;
}

function Note(props: IProps) {
	/**
	 * CHANGE: Updated the 'evaluateEquation()' method so that it uses the 'evaluate()' function rather than the 'eval()' function
	 */
	function evaluateEquation() {
		try {
			const result = evaluate(props.text);
			Alert.alert('Result', 'Result: ' + result.toString());
		} catch {
			Alert.alert('Error', 'Invalid math equation.');
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{props.title}
			</Text>
			<Text style={styles.text}>
				{props.text}
			</Text>

			<View style={styles.evaluateContainer}>
				<Button title='Evaluate' onPress={evaluateEquation} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 16,
	},
	evaluateContainer: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default Note;