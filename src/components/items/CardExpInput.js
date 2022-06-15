import * as React from "react";
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import PropTypes from "prop-types";
import {min} from "lodash";
export default class DateInput extends React.Component {
  static propTypes = {
    mask: PropTypes.string,
    validate: PropTypes.bool,
    activeColor: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    inputProps: PropTypes.instanceOf(TextInput),
  };
  static defaultProps = {
    mask: "MM/YY",
    onChange: () => {},
    activeColor: "#7368FF",
    validate: true,
    isFromProfile: false,
    currentTime: null,
    minYear: false,
    maxYear: false,
    disableInput: false,
  };

  constructor(props) {
    super(props);
    let index = -1;
    const mask = props.mask.split("").map((v) => {
      const isTextField = ["M", "Y"].includes(v);
      if (isTextField) {
        index++;
      }
      return {
        text: v,
        isTextField,
        index,
      };
    });
    const maxLength = Array.prototype.filter.call(mask, (m) => m.isTextField).length;
    this.state = {
      date: props.currentTime ?? "",
      disableInput: props.disableInput ?? false,
      mask,
      maxLength,
      minYear: null,
      maxYear: null,
      isFocused: false,
      hasChange: false,
    };
  }
  handleTextChange(date) {
    if (!this.props.disableInput) {
      this.props.onChangeInput();
      this.setState({hasChange: true});
      const mask = Array.prototype.filter.call(this.state.mask, (v) => v.isTextField);
      console.log("this.state.date", this.state.date);
      const M = Array.prototype.filter
        .call(this.state.mask, (v) => v.text === "M")
        .map((v) => date[v.index])
        .join("");
      const Y = Array.prototype.filter
        .call(this.state.mask, (v) => v.text === "Y")
        .map((v) => date[v.index])
        .join("");
      if (this.props.validate && date.length > this.state.date.length) {
        const maxMonth = 12;
        const minMonth = 1;
        // const maxYear = this.props.maxYear || null;
        // const minYear = 2000;

        // Only validate year if pattern is valid.
        if ([1, 2].includes(Y.length)) {
          const y = parseInt(Y.length < 4 ? `${Y}${"0".repeat(4 - Y.length)}` : Y, 10);
        }
        // Only validate month if pattern is valid (MM)
        if ([1, 2].includes(M.length)) {
          const m = parseInt(M.length === 1 && M[0] !== "0" ? `${M}0` : M, 10);
          const minM = M[0] === "0" && M[1] === "0" ? false : true;
          if (!(!Number.isNaN(m) && m <= maxMonth && minM)) {
            this.props.getErrorInput(global.t("wrong_month_input_format"));
            return;
          }
        }
        // Only validate date if pattern is valid and month has already been entered.
      }
      if (mask.length === date.length) {
        const finalDate = new Date(`${M}-${Y}`);
        this.props.onChange(
          finalDate.toString() === "Invalid Date"
            ? String.prototype.slice.call(this.props.mask).replace(/M{2}/g, M).replace(/Y{2}/g, Y)
            : finalDate,
        );
        console.log(finalDate);
        Keyboard.dismiss();
        this.props?.getDataBirthday({exp_year: Y, exp_month: M});
      }
      // console.log('this.state.date', date);

      this.setState({date});
    }
  }

  render() {
    const {mask, disableInput, date, hasChange} = this.state;
    const timeInput =
      date.length === 0 && !hasChange && this.props?.currentTime && this.props.currentTime.length > 0 ? this.props.currentTime : date;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          width: 100,
        }}
      >
        <TextInput
          editable={true}
          keyboardType={"number-pad"}
          style={{
            position: "absolute",
            maxHeight: 0,
            maxWidth: 0,
            backgroundColor: "transparent",
            color: "transparent",
          }}
          onFocus={() => this.setState({isFocused: true})}
          onBlur={() => this.setState({isFocused: false})}
          maxLength={this.state.maxLength}
          ref={(ref) => {
            this.input = ref;
          }}
          value={timeInput}
          onChangeText={this.handleTextChange.bind(this)}
        />
        {mask.map((v, key) => (
          <TouchableWithoutFeedback disabled={this.props.disableInput} key={key} onPress={() => this.input.focus()}>
            <View style={{paddingHorizontal: Platform.OS == "ios" ? 2 : 0}}>
              {v.isTextField ? (
                <View pointerEvents={"none"}>
                  <TextInput
                    placeholder={v.text}
                    placeholderTextColor={"#aaa"}
                    value={timeInput[v.index]}
                    style={{
                      padding: Platform.OS == "ios" ? 2 : 0,
                      textAlign: "center",
                      fontSize: 12,
                      backgroundColor: "#fff",
                      borderBottomWidth: 1,
                      borderBottomColor: this.state.isFocused && this.state.date.length === v.index ? this.props.activeColor : "#aaa",
                      color: "#5D5D5D",
                    }}
                  />
                </View>
              ) : (
                <Text style={{fontSize: 12, color: "#aaa"}}>{v.text}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}