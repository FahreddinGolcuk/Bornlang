import React from 'react'
import Home from './Home'
import RegisterScreen from './RegisterScreen'
import Tabbar from './Tabbar'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class LoginAreaStack extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerTitleStyle:{display:'none'},headerTintColor:'#A65ECC',headerStyle:{elevation:0}}} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerTitleStyle:{display:'none'},headerTintColor:'#A65ECC',headerStyle:{elevation:0}}} />
                    <Stack.Screen name="Tabbar" component={Tabbar}  options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default LoginAreaStack