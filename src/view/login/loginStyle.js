import { StyleSheet } from 'react-native';

import { color, font } from '../../assets/styles/theme';

const login = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logoIcon: {
    fontSize: 50,
    marginBottom: 30
  },
  logoTitle: {},
  formGroup: {
    flex: 2
  },
  inputGroup: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    alignSelf: 'center',
    borderBottomColor: color.primary_color,
    borderBottomWidth: 2,
    height: 50,
    width: 300
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    padding: 15,
    backgroundColor: color.primary_color
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  tip: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  tip_block: {
    height: 200,
    width: 275,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  tip_title: {
    fontWeight: 'bold',
    fontSize: font.big_size
  },
  tip_content: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  tip_message: {
    fontSize: font.primary_size,
    lineHeight: font.big_size
  },
  tip_validate_button: {
    backgroundColor: color.primary_color,
    color: color.primary_color
  },
  text: {
    color: color.info_color,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: font.small_size,
    marginBottom: 10
  }
});

export default login;
