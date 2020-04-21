import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux'
import Feather from 'react-native-vector-icons/Feather'
import { Langs } from '../Langs'
import { darkBlack, googleColor, facebookColor, mainPurple } from '../Colors'
import Database from '../../Database'
import { delete_favorite } from '../../actions';
const { width } = Dimensions.get('window')


const colors = [darkBlack, googleColor, facebookColor, mainPurple]

class Favorites extends React.Component {

  deleteFavoriteAction = (index,favorite_id) =>{
    Alert.alert(
      "REQUEST DELETE",
      "Are you sure delete to favorite?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.deleteFavorite(index,favorite_id) }
      ],
      { cancelable: true }
    )
  }

  deleteFavorite = (index,favorite_id) =>{
    Database.shared.deleteFavorite(favorite_id)
    this.props.deleteFavorites(index)
  }

  render() {
    return (
      <SafeAreaView style={{ alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
        <Image
        source = {require('../images/Favorites-images.jpg')}
        style={{width:width/2,height:width/2}}
        />
        <Text style={{ color: '#6D17B0', fontWeight: 'bold', fontSize: 25 }}>FAVORITES</Text>
        <FlatList
          showsVerticalScrollIndicator={false} //new added
          style={{ marginTop: 25, width: '95%' }}
          contentContainerStyle={{ paddingBottom: 121 }}
          data={this.props.FavoritesRedux}
          keyExtractor={(index) => index.toString()}
          renderItem={({ item, index }) =>
            <View style={{
              borderLeftWidth: 5,
              borderLeftColor: colors[index % colors.length],
              width: '95%',
              alignSelf:'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              shadowColor: '#fff',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.4,
              shadowRadius: 15,
              elevation: 6,
              backgroundColor: 'white',
              marginTop: 16,
              flexDirection: 'row',
            }}>
              <View style={{maxWidth:'80%'}}>
                <Image
                  source={Langs[item.source_flag - 1].flag}
                  style={{ width: width / 10, height: width / 10 }}
                />
                <Text style={{ color: darkBlack, fontSize: 20, fontWeight: 'bold' }}>{item.source_text}</Text>
                <Image
                  source={Langs[item.target_flag - 1].flag}
                  style={{ width: width / 10, height: width / 10 }}
                />
                <Text style={{ color: darkBlack, fontSize: 20, fontWeight: 'bold' }}>{item.target_text}</Text>
              </View>
              <TouchableOpacity
              onPress = {()=>this.deleteFavoriteAction(index,item.favorite_id)}
              >
                <Feather
                  name='trash'
                  size={width / 12}
                  color={colors[index % colors.length]}
                />
              </TouchableOpacity>
            </View>
          }
        />
      </SafeAreaView>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
      deleteFavorites: (index) => dispatch({ type: delete_favorite, deleteIndex: index })
  }
}

function mapStateToProps(state) { //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
  return {
    FavoritesRedux: state.FavoritesRedux
  }
}
//TODO DELETE FAVORITE
export default connect(mapStateToProps,mapDispatchToProps)(Favorites)
