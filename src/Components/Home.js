import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    StatusBar,
    Animated,
    StyleSheet,
    Easing
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { inputTextColor, mainPurple, deactiveColor, darkBlack, lowOpacityPurple, facebookColor, googleColor, questionColor, questionPressColor } from '../Colors'
import Fire from '../../Fire'
const { width, height } = Dimensions.get('screen')

class Home extends React.Component {

    state = {
        fillColorMail: deactiveColor,
        fillBorderWidthMail: 0,

        fillBorderWidthPass: 0,
        fillColorPass: deactiveColor,

        searchBarWidth: new Animated.Value(0.5),
        imagePosition: new Animated.Value(0),

        email: '',
        pass: '',
    }
    animateImage = () => {
        Animated.timing(this.state.imagePosition, {
            toValue: 1,
            duration: 750,
            easing: Easing.bounce,
            useNativeDriver: true
        }).start()
    }
    xVal = this.state.imagePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [-400, 0]
    })
    yVal = this.state.imagePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 0]
    })

    interpolateBar = this.state.searchBarWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '90%']
    })
    animateSearchBar = Animated.spring(this.state.searchBarWidth, {
        toValue: 1,
        useNativeDriver: false
    })
    animateSearchBarClose = Animated.spring(this.state.searchBarWidth, {
        toValue: 0.5,
        useNativeDriver: false
    })
    componentDidMount() {
        this.animateImage()
    }
    startSearchAnimate = () => {
        this.animateSearchBar.start()
    }
    finishSearchAnimate = () => {
        this.animateSearchBarClose.start()
    }

    onFocusMail = () => {
        this.startSearchAnimate()
        this.setState({
            fillColorMail: mainPurple,
            fillBorderWidthMail: 1.2,
        })
    }
    onBlurMail = () => {
        this.finishSearchAnimate()
        this.setState({
            fillColorMail: deactiveColor,
            fillBorderWidthMail: 0,
        })
    }
    onFocusPass = () => {
        this.startSearchAnimate()
        this.setState({
            fillColorPass: mainPurple,
            fillBorderWidthPass: 1.2,
        })
    }
    onBlurPass = () => {
        this.finishSearchAnimate()
        this.setState({
            fillColorPass: deactiveColor,
            fillBorderWidthPass: 0,
        })
    }

    signUser = async () => {
        var isVerified = await Fire.shared.loginUser(this.state.email, this.state.pass)
        if (isVerified === true) {
            this.props.navigation.navigate('Tabbar')
        } else {
            alert('NOT VERIFIED ACCOUNT')
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                <StatusBar
                    backgroundColor='white'
                    barStyle='dark-content'
                />
                <Animated.Image
                    source={require('../images/Home-images.png')}
                    style={{ width: width / 2, height: width / 2, transform: [{ translateY: this.yVal }] }}
                />
                <Text style={{ fontSize: 20, color: darkBlack, fontWeight: 'bold' }}>Welcome Bornlang!</Text>
                <Text style={{ fontSize: 15, color: lowOpacityPurple, fontWeight: 'bold' }}>Log in to your account</Text>

                <Animated.View
                    style={[styles.textInputs, { width: this.interpolateBar, borderWidth: this.state.fillBorderWidthMail }]}
                >
                    <MaterialIcons
                        name='person-outline'
                        style={{ marginLeft: 8 }}
                        size={width / 15}
                        color={this.state.fillColorMail}
                    />
                    <TextInput
                        style={{ width: '85%', color: inputTextColor }}
                        placeholder='johnwick@gmail.com'
                        placeholderTextColor={deactiveColor}
                        onChangeText={(value) => this.setState({ email: value })}
                        onBlur={() => this.onBlurMail()}
                        onFocus={() => this.onFocusMail()}

                    />
                </Animated.View>
                <Animated.View
                    style={[styles.textInputs, { width: this.interpolateBar, borderWidth: this.state.fillBorderWidthPass }]}
                >
                    <MaterialIcons
                        name='lock-outline'
                        size={width / 15}
                        style={{ marginLeft: 8 }}
                        color={this.state.fillColorPass}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={{ width: '85%', color: inputTextColor }}
                        placeholder='Password'
                        placeholderTextColor={deactiveColor}
                        onChangeText={(value) => this.setState({ pass: value })}
                        onFocus={() => this.onFocusPass()}
                        onBlur={() => this.onBlurPass()}

                    />
                </Animated.View>
                <TouchableOpacity
                    onPress={() => navigate('ForgotPassword')}
                    style={{ marginTop: 8, alignSelf: 'flex-end', marginRight: 16 }}
                >
                    <Text style={{ fontSize: 12, color: darkBlack }}>Forgot Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.signUser()}
                    style={styles.loginButtonContainer}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 36 }}>LOG IN</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, color: darkBlack, fontWeight: '100', marginTop: 8 }}>or connect using</Text>
                <View
                    style={{ width: '100%', padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}
                >
                    <TouchableOpacity
                        style={[styles.socialContainer, { backgroundColor: facebookColor }]}
                    >
                        <MaterialCommunityIcons
                            name='facebook'
                            color='white'
                            size={width / 15}
                        />
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.socialContainer, { backgroundColor: googleColor }]}
                    >
                        <MaterialCommunityIcons
                            name='google'
                            color='white'
                            size={width / 15}
                        />
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Google</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.questionContainer} >
                    <Text style={{ color: questionColor }}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigate('Register')}
                    >
                        <Text style={{ color: questionPressColor, marginLeft: 8 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputs: {
        marginTop: 16,
        borderRadius: 180,
        borderColor: mainPurple,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 23,
        elevation: 7,
        height: height / 16,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonContainer: {
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
    socialContainer: {
        borderRadius: 5,
        width: '40%',
        height: height / 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    questionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8
    }
})


export default Home