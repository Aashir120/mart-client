import React from 'react';
import { View, Text, Button,Linking, StyleSheet } from 'react-native';
import { openApp } from "rn-openapp";

const examplePackageId = "com.raafiya.universalacremotecontrol";

const SettingsScreen = () => {

  const openAc = () => {
    openApp(examplePackageId)
  .then(result => console.log(result))
  .catch(e => console.warn(e)); 
}
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button
          title="Ac Control"
          onPress={openAc}
        />
      </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
