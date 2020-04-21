import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Langs } from '../Langs'
import {mainPurple,darkBlack, lowOpacityPurple} from '../Colors'
import { connect } from 'react-redux'
import Database from '../../Database';
import {add_favorite} from '../../actions'
import ImagePicker from 'react-native-image-picker';
import Ocr from 'react-native-tesseract-ocr'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get('window')
const tessOptions = {
  whitelist: null,
  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

class TranslateScreen extends React.Component {
  state = {
    phototext:'',
    text: '',
    result: '',
    sourceLang: Langs[0],
    targetLang: Langs[1],
    isFavorite : false
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.extractText(response.path)
      }
    })
  }

  extractText = (imgpath) => {
    Ocr.recognize(imgpath, 'LANG_ENGLISH', tessOptions)
      .then((res) => {
        this.setState({ phototext: res }) })
      .then(()=>{
        this.translate(this.state.phototext)
      })
      .done()
  }
  controlIsFavorite = () =>{
    this.props.FavoritesRedux.forEach(val=>{
      if(val.source_text===this.state.text && val.target_text === this.state.result[0]){
        this.setState({isFavorite:true})
      }
    })
  }
  translate = async (val) => {
    this.setState({
      isFavorite:false,
      text: val
    }, () => {
      fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200409T112813Z.51e32dafd3434153.e26c85ce392e6b0d11325bb820798aedd67ddc8f&text=
            ${this.state.text}&lang=${this.state.sourceLang.short}-${this.state.targetLang.short}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.code === 200) {
            this.setState({
              result: result.text,
            })
            this.controlIsFavorite()
          }
        })
    })
  }

  addFavorites = async() => {
    if(!this.state.isFavorite){
      var object = `{"source_text":"${this.state.text}","target_text":"${this.state.result[0]}","source_flag":${this.state.sourceLang.flag},"target_flag":${this.state.targetLang.flag}}`
      object = JSON.parse(object)
      var newFavID = await Database.shared.addFavorites(object)
      var objectRedux = `{"favorite_id":${newFavID},"source_text":"${this.state.text}","target_text":"${this.state.result[0]}","source_flag":${this.state.sourceLang.flag},"target_flag":${this.state.targetLang.flag}}`
      objectRedux = JSON.parse(objectRedux)
      this.props.addFavorites(object)
      this.controlIsFavorite()
      Alert.alert('Add to favorites with successfully')
    }else Alert.alert('This translate already added to favorites')
  }

  exchangeLangs = () => {
    var a, b
    a = this.state.targetLang
    b = this.state.sourceLang
    this.setState({
      targetLang: b,
      sourceLang: a
    })
    this.translate(this.state.text)
  }

  GetAllLangItems = () =>{
    return Object.keys(Langs).map((key, index) => {
      return (
        <Picker.Item label={Langs[index].name} value={Langs[index]} key={Langs[index].short} />
      )
    })
  }

  render() {
    return (
      <SafeAreaView style={{ alignItems: 'center', flex: 1,backgroundColor:'white' }}>
        <Image
        source={require('../images/Header-images.png')}
        style={{width:width/3,height:width/3,margin:8}}
        resizeMode='contain'
        />
        <View style={styles.translateContainer}>

          <View style={{ width: '90%' }}>
            <View style={styles.pickerFlagContainer}>
              <Image
                source={this.state.sourceLang.flag}
              />
              <Picker
                style={styles.LangPickerWidget}
                mode='dialog'
                selectedValue={this.state.sourceLang}
                onValueChange={(item) => {
                  this.setState({ sourceLang: item })
                  this.translate(this.state.text)
                }}
              >
                {this.GetAllLangItems()}
              </Picker>
              <TouchableOpacity
            
            onPress = {()=>this.handleChoosePhoto()}
            >
              <MaterialCommunityIcons
              name = 'image-filter-center-focus-weak'
              size={width/13}
              color={darkBlack}
              />
              <Text style={{color:mainPurple,fontSize:10}}>Photo to text</Text>
              <Text style={{color:lowOpacityPurple,fontSize:7}}>Only supported to english character.</Text>
            </TouchableOpacity>
            </View>
            <TextInput
            defaultValue = {this.state.phototext}
              placeholder='Enter word here'
              placeholderTextColor={lowOpacityPurple}
              multiline={true}
              numberOfLines={4}
              style={styles.sourceTextInput}
              onChangeText={(val) => this.translate(val)}
            />

          </View>

          <TouchableOpacity
            style={styles.exchangeLangWidget}
            onPress={() => this.exchangeLangs()}
          >
            <FontAwesome5
              name='exchange-alt'
              size={16}
              color={mainPurple}
            />
          </TouchableOpacity>
          <View style={{ width: '90%' }}>
            <View style={styles.pickerFlagContainer}>
              <Image
                source={this.state.targetLang.flag}
              />
              <Picker
                style={styles.LangPickerWidget}
                mode='dialog'
                selectedValue={this.state.targetLang}
                onValueChange={(item) => {
                  this.setState({ targetLang: item })
                  this.translate(this.state.text)
                }}
              >
                {this.GetAllLangItems()}
              </Picker>
            </View>
            <ScrollView style={{ maxHeight: height>600?height/ 5:height/7 }}>
              <Text style={{ color: darkBlack, fontWeight: 'bold', fontSize: 20 }}>{this.state.result}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.favoriteWidget}
              onPress = {()=>this.addFavorites()}
            >
              <MaterialIcons
                name={this.state.isFavorite==false?'favorite-border':'favorite'}
                color={mainPurple}
                size={36}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.yandexContainer}>
            <FontAwesome5
              name='yandex'
              size={8}
              color='red'
            />
            <Text style={styles.yandexText}>Powered by Yandex.Translate</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  translateContainer: {
    width: '100%',
    height: height>600?height/ 1.4:height/1.6,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
    alignItems: 'center',
  },
  exchangeLangWidget: {
    transform: [{rotate:4.7}],
    width: width / 10,
    height: width / 10,
    borderRadius: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: mainPurple,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 11
  },
  LangPickerWidget: {
    height: 50,
    width: width / 3,
    color: darkBlack,
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
  },
  yandexContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom:4
  },
  yandexText: {
    color: mainPurple,
    fontSize: 8,
    marginLeft: 8
  },
  favoriteWidget: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  pickerFlagContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  sourceTextInput: {
    fontSize: 20,
    color: mainPurple,
    fontWeight: 'bold',
    maxHeight: height>600?height/ 5:height/7 
  }
})

function mapStateToProps(state) {
  return {
      FavoritesRedux: state.FavoritesRedux
  }
}
function mapDispatchToProps(dispatch) {
  return {
      addFavorites: (newObject) => dispatch({ type: add_favorite, NewItem: newObject })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslateScreen)
