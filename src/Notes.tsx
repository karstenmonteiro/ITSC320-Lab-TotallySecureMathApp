import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
/**
 * CHANGE: Installed 'react-native-encrypted-storage', which provides a secure and easy way to store data locally on the device.
 */
import EncryptedStorage from 'react-native-encrypted-storage';

export interface INote {
	title: string;
	text: string;
}

interface IProps {
}

interface IState {
	notes: INote[];
	newNoteTitle: string;
	newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
	constructor(props: Readonly<TProps>) {
		super(props);

		this.state = {
			notes: [],
			newNoteTitle: '',
			newNoteEquation: ''
		};

		this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
		this.onNoteEquationChange = this.onNoteEquationChange.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	public async componentDidMount() {
		const existing = await this.getStoredNotes();

		this.setState({ notes: existing });
	}

	public async componentWillUnmount() {
		this.storeNotes(this.state.notes);
	}

	/**
	 * CHANGE: Use the 'react-native-encrypted-storage' package to securely get the notes.
	 */
	private async getStoredNotes(): Promise<INote[]> {
		/**
		 * CHANGE: Changed 'suffix' to 'userId' and changed its value to the user's token (rather than using their username/password)
		 */
		const userId = this.props.route.params.user.token;

		try {
			/**
			 * Use 'EncryptedStorage' rather than 'AsyncStorage' to get notes
			 */
			const value = await EncryptedStorage.getItem('notes-' + userId);
			
			if (value !== null) {
				return JSON.parse(value);
			}
		} catch (error) {
			/**
			 * Handle the error
			 */
			console.error('Error fetching store notes:', error);
		}

		return [];
	}

	/**
	 * CHANGE: Use the 'react-native-encrypted-storage' package to securely store the notes.
	 */
	private async storeNotes(notes: INote[]) {
		/**
		 * CHANGE: Changed 'suffix' to 'userId' and changed its value to the user's token (rather than using their username/password)
		 */
		const userId = this.props.route.params.user.token;

		try {
			const jsonValue = JSON.stringify(notes);
			/**
			 * Use 'EncryptedStorage' rather than 'AsyncStorage' to store notes
			 */
			await EncryptedStorage.setItem('notes-' + userId, jsonValue);
		} catch (error) {
			/**
			 * Handle the error
			 */
			console.error('Error storing notes:', error);
		}
	}

	private onNoteTitleChange(value: string) {
		this.setState({ newNoteTitle: value });
	}

	private onNoteEquationChange(value: string) {
		this.setState({ newNoteEquation: value });
	}

	private addNote() {
		/**
		 * CHANGE: Sanitize/trim input to remove any non-alphanumeric characters, EXCEPT FOR basic math symbols
		 */
		const sanitizedTitle = this.state.newNoteTitle.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    	const sanitizedEquation = this.state.newNoteEquation.replace(/[^a-zA-Z0-9\s+\-*/().^%]/g, '').trim();

		/**
		 * CHANGE: Validate that the 'title'/'equation' fields are not empty
		 */
		if (sanitizedTitle === '' || sanitizedEquation === '') {
			Alert.alert('Error', 'The title and/or equation fields cannot be empty or contain invalid characters. Please try again.');
			return;
		}

		const note: INote = {
			title: sanitizedTitle,
			text: sanitizedEquation
		};

		this.setState({
			notes: this.state.notes.concat(note),
			newNoteTitle: '',
			newNoteEquation: ''
		});
	}

	public render() {
		return (
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View style={styles.container}>
						<Text style={styles.title}>
							{'Math Notes: ' + this.props.route.params.user.username}
						</Text>
						<TextInput
							style={styles.titleInput}
							value={this.state.newNoteTitle}
							onChangeText={this.onNoteTitleChange}
							placeholder="Enter your title"
						/>
						<TextInput
							style={styles.textInput}
							value={this.state.newNoteEquation}
							onChangeText={this.onNoteEquationChange}
							placeholder="Enter your math equation"
						/>
						<Button title="Add Note" onPress={this.addNote} />

						<View style={styles.notes}>
							{this.state.notes.map((note, index) => (
								<Note key={index} title={note.title} text={note.text} />
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	titleInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	notes: {
		marginTop: 15
	},
});