import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  View,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';

import ReactNativeBiometrics from 'react-native-biometrics';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [authorized, setAuthorized] = useState(false);

  const bioMetricCheck = useCallback(async () => {
    const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();

    if (biometryType === ReactNativeBiometrics.Biometrics) {
      ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
        .then((resultObject) => {
          const {success} = resultObject;

          if (success) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        })
        .catch(() => {
          console.log('biometrics failed');
        });
    }
  }, []);

  const unAuthorize = () => setAuthorized(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.pageWrap}>
            <Image style={styles.image} source={require('./fingerprint.png')} />

            <Text style={styles.title}>Hello Biometrics</Text>
            <Text
              style={[
                styles.subTitle,
                authorized ? styles.authorized : styles.unAuthorized,
              ]}>{`You are ${
              authorized ? 'authorized 😎' : 'not authorized 🔐'
            }`}</Text>

            {authorized ? (
              <Pressable style={styles.buttonWrap} onPress={unAuthorize}>
                <Text style={styles.button}>Unauthorize Me</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.buttonWrap} onPress={bioMetricCheck}>
                <Text style={styles.button}>Authorize Me</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 60,
  },
  title: {
    fontSize: 40,
    color: '#C55',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    color: '#CCC',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  unAuthorized: {
    color: '#CCC',
  },
  authorized: {
    color: '#55cc94',
  },
  pageWrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 10,
  },
  buttonWrap: {
    marginTop: 80,
  },
  button: {
    backgroundColor: '#C55',
    paddingHorizontal: 24,
    paddingVertical: 12,
    color: '#F5F5F5',
    borderRadius: 4,
    fontSize: 18,
  },
});

export default App;
