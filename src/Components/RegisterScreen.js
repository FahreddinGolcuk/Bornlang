import React from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity,StyleSheet, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {deactiveColor,mainPurple,questionPressColor,questionColor,darkBlack,lowOpacityPurple,inputTextColor} from '../Colors'
import Fire from '../../Fire'
const { width, height } = Dimensions.get('screen')

class RegisterScreen extends React.Component {
    state = {
        fillColorMail: deactiveColor,
        fillBorderWidthMail: 0,

        fillBorderWidthPass: 0,
        fillColorPass: deactiveColor,

        email : '',
        pass : ''
    }

    onFocusMail = () => {

        this.setState({
            fillColorMail: mainPurple,
            fillBorderWidthMail: 1.2,
        })
    }
    onBlurMail = () => {
        this.setState({
            fillColorMail: deactiveColor,
            fillBorderWidthMail: 0,
        })
    }
    onFocusPass = () => {

        this.setState({
            fillColorPass: mainPurple,
            fillBorderWidthPass: 1.2,
        })
    }
    onBlurPass = () => {

        this.setState({
            fillColorPass: deactiveColor,
            fillBorderWidthPass: 0,
        })
    }
    createNewUser = async() =>{
        Fire.shared.createNewUser(this.state.email,this.state.pass)
        alert('Please check your mail')
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                <Image
                    source={require('../images/Register-images.png')}
                    style={{ width: width / 2, height: width / 2, marginTop: 16 }}
                />
                <Text style={{ fontSize: 20, color: darkBlack, fontWeight: 'bold' }}>Let's Get Started!</Text>
                <Text style={{ fontSize: 15, color: lowOpacityPurple, fontWeight: 'bold' }}>Create an account to get all features</Text>

                <View style={[styles.textInputs,{borderWidth: this.state.fillBorderWidthMail}]}>
                    <MaterialIcons
                        name='person-outline'
                        size={width / 15}
                        color={this.state.fillColorMail}
                    />
                    <TextInput
                        style={{ width: '85%', color: inputTextColor }}
                        placeholder='johnwick@gmail.com'
                        placeholderTextColor={deactiveColor}
                        onChangeText = {value=>this.setState({email:value})}
                        onBlur={() => this.onBlurMail()}
                        onFocus={() => this.onFocusMail()}
                    />
                </View>
                <View style={[styles.textInputs,{borderWidth: this.state.fillBorderWidthPass}]}>
                    <MaterialIcons
                        name='lock-outline'
                        size={width / 15}
                        color={this.state.fillColorPass}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={{ width: '85%', color: inputTextColor }}
                        placeholder='Password'
                        placeholderTextColor={deactiveColor}
                        onChangeText = {value=>this.setState({pass:value})}
                        onFocus={() => this.onFocusPass()}
                        onBlur={() => this.onBlurPass()}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.createNewUser()}
                    style={styles.createButton}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 36 }}>CREATE</Text>
                </TouchableOpacity>
                
                <View style={styles.questionContainer} >
                    <Text style={{ color: questionColor }}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Home')}
                    >
                        <Text style={{ color: questionPressColor, marginLeft: 8 }}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    textInputs : {
        marginTop: 16,
        borderRadius: 180,
        width: '90%',
        borderColor: mainPurple,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 23,
        elevation: 7,
        height: height / 13,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButton : {
        width: '50%',
        height: height / 12,
        backgroundColor: mainPurple,
        borderRadius: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        shadowColor: mainPurple,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 23,
        elevation: 7,
    },
    questionContainer : {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:8
    }
})


export default RegisterScreen