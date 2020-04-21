import React from 'react'
import { View, Text, Dimensions, Image, TextInput, TouchableOpacity,StyleSheet, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {deactiveColor,mainPurple,questionPressColor,questionColor,darkBlack,lowOpacityPurple,inputTextColor} from '../Colors'
import Fire from '../../Fire'
const { width, height } = Dimensions.get('screen')

class ForgotPasswordScreen extends React.Component {
    state = {
        fillColorMail: deactiveColor,
        fillBorderWidthMail: 0,

        fillBorderWidthPass: 0,
        fillColorPass: deactiveColor,

        email : '',
    }
    ResetPassword = async() =>{
        await Fire.shared.sendResetPassword(this.state.email)
        this.props.navigation.navigate('Home')
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
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                <Image
                    source={require('../images/ForgotPassword-images.jpg')}
                    style={{ width: width / 2, height: width / 2, marginTop: 16 }}
                />
                <Text style={{ fontSize: 20, color: darkBlack, fontWeight: 'bold' }}>Did you forget your password?</Text>
                <Text style={{ fontSize: 15, color: lowOpacityPurple, fontWeight: 'bold' }}>Reset your password</Text>

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
                <TouchableOpacity
                    onPress={() => this.ResetPassword()}
                    style={styles.createButton}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 36 }}>RESET</Text>
                </TouchableOpacity>
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


export default ForgotPasswordScreen