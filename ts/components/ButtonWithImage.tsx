import { Text, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import customVariables from "../theme/variables";
import ButtonDefaultOpacity from "./ButtonDefaultOpacity";
import IconFont from "./ui/IconFont";

const styles = StyleSheet.create({
  viewRL: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.25
  },

  viewCenter: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5
  },

  margin: {
    marginTop: 10,
    marginBottom: 10
  }
});

const baseStyles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 10,
    marginBottom: 10,
    height: 40
  },

  icon: {
    lineHeight: 24,
    paddingRight: 12
  },

  text: {
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 20
  }
});

const darkStyles = StyleSheet.create({
  button: {
    backgroundColor: customVariables.brandPrimary,
    borderWidth: 1,
    borderColor: customVariables.brandPrimary
  },

  icon: {
    color: customVariables.colorWhite
  },

  text: {
    color: customVariables.colorWhite
  }
});

const lightStyles = StyleSheet.create({
  button: {
    backgroundColor: customVariables.colorWhite,
    borderWidth: 1,
    borderColor: customVariables.brandPrimary
  },

  icon: {
    color: customVariables.brandPrimary
  },

  text: {
    color: customVariables.brandPrimary
  }
});

type Props = {
  icon: string;
  onClick: () => void;
  text: string;
  disabled?: boolean;
  light?: boolean;
};

// Create a button consisting of an icon + label
class ButtonWithImage extends React.PureComponent<Props> {
  public render() {
    const { icon, onClick, text, disabled, light } = this.props;
    return (
      <ButtonDefaultOpacity
        disabled={disabled !== undefined ? disabled : false}
        onPress={onClick}
        style={[
          styles.margin,
          baseStyles.button,
          light ? lightStyles.button : darkStyles.button
        ]}
      >
        <View style={styles.viewRL}>
          <IconFont
            name={icon}
            style={[
              baseStyles.icon,
              light ? lightStyles.icon : darkStyles.icon
            ]}
          />
        </View>
        <View style={styles.viewCenter}>
          <Text
            style={[
              baseStyles.text,
              light ? lightStyles.text : darkStyles.text
            ]}
          >
            {text}
          </Text>
        </View>
        <View style={styles.viewRL} />
      </ButtonDefaultOpacity>
    );
  }
}

export default ButtonWithImage;