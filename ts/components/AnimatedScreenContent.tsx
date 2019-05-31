/**
 * This component provides a ScrollView able to:
 * - scroll to top on its focus
 * - provide a dynanic subheader appearing on scroll
 */
import { View } from "native-base";
import * as React from "react";
import { Animated, Platform, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { NavigationEvents } from "react-navigation";
import customVariables from "../theme/variables";
import { ComponentProps } from "../types/react";
import { ScreenContentHeader } from "./screens/ScreenContentHeader";

type OwnProps = Readonly<{
  ListEmptyComponent?: React.ReactNode;
  fixedSubHeader?: React.ReactNode;
  interpolationVars?: ReadonlyArray<number>; // top header width, header content width, desired offset
  hideHeader?: boolean;
}>;

type Props = OwnProps & ComponentProps<typeof ScreenContentHeader>;

type State = Readonly<{
  scrollY: Animated.Value;
}>;

const INITIAL_STATE = {
  scrollY: new Animated.Value(0)
};

const styles = StyleSheet.create({
  animatedSubHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden"
  }
});

export default class AnimatedScreenContent extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  private scrollableContentRef = React.createRef<any>();

  private scrollToTop = () => {
    this.scrollableContentRef.current
      .getNode()
      .scrollTo({ y: 0, animated: false });
  };

  // TODO: define how to properly get the header height
  private headerHeight: number =
    Platform.OS === "ios"
      ? customVariables.appHeaderHeight + getStatusBarHeight(true)
      : customVariables.appHeaderHeight;

  public render(): React.ReactNode {
    const { interpolationVars } = this.props;

    const subHeaderTranslaction =
      interpolationVars && interpolationVars.length === 3
        ? this.state.scrollY.interpolate({
            inputRange: [
              0,
              interpolationVars[1] - interpolationVars[2],
              interpolationVars[1] + interpolationVars[2]
            ],
            outputRange: [-interpolationVars[0], 0, 0],
            extrapolate: "clamp"
          })
        : 0;

    return (
      <React.Fragment>
        <Animated.ScrollView
          style={{ zIndex: -2 }}
          bounces={false}
          ref={this.scrollableContentRef}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <NavigationEvents onWillFocus={this.scrollToTop} />

          {!this.props.hideHeader && (
            <ScreenContentHeader
              title={this.props.title}
              icon={this.props.icon}
              dark={this.props.dark}
            />
          )}

          {this.props.children}
        </Animated.ScrollView>

        <Animated.View
          style={[
            { zIndex: -1 },
            styles.animatedSubHeader,
            {
              transform: [{ translateY: subHeaderTranslaction }]
            }
          ]}
        >
          <View style={{ marginTop: this.headerHeight }}>
            {this.props.fixedSubHeader}
          </View>
        </Animated.View>
      </React.Fragment>
    );
  }
}
