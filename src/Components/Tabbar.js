import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from './Favorites'
import TranslateScreen from './TranslateScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();


class Tabbar extends React.Component{
    render(){
        return(
            <Tab.Navigator
            screenOptions = {({route})=>({
              tabBarIcon : ({focused,color,size})=>{
                let iconName
                if(route.name === 'Translate'){
                  iconName = focused
                  ? 'translate'
                  : 'translate'
                }
                else if(route.name === 'Favorites'){
                  iconName = focused
                  ? 'favorite'
                  : 'favorite-border'
                }
                size = focused ? 25 : 20
                if(route.name === 'Favorites'){
                    return <MaterialIcons
                    name = {iconName}
                    size = {size}
                    color = {color}
                    />
                }else return <Icon name={iconName} size={size} color={color}/>
              }
            })}
            tabBarOptions={{
              activeTintColor:'#6D17B0',
              inactiveTintColor:'gray',
            }}
            >
              <Tab.Screen name="Translate" component={TranslateScreen} />
              <Tab.Screen name="Favorites" component={Favorites} />
            </Tab.Navigator>
        )
    }
}
export default Tabbar