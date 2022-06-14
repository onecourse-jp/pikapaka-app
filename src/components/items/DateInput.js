import * as React from "react";
import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard} from "react-native";
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
    mask: "YYYY/MM/DD",
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
      const isTextField = ["Y", "M", "D"].includes(v);
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
    };
  }
  handleTextChange(date) {
    if (!this.props.disableInput) {
      this.props.onChangeInput();
      const mask = Array.prototype.filter.call(this.state.mask, (v) => v.isTextField);
      console.log("this.state.date", this.state.date);
      const M = Array.prototype.filter
        .call(this.state.mask, (v) => v.text === "M")
        .map((v) => date[v.index])
        .join("");
      const D = Array.prototype.filter
        .call(this.state.mask, (v) => v.text === "D")
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
        if ([1, 2, 3, 4].includes(Y.length)) {
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
        if ([1, 2].includes(D.length) && M.length === 2) {
          const d = parseInt(D.length === 1 ? `${D}0` : D, 10);
          const minD = D[0] === "0" && D[1] === "0" ? false : true;
          const maxDay = new Date(Y.length === 4 ? parseInt(Y, 10) : new Date().getFullYear(), M, 0).getDate();
          if (!(!Number.isNaN(d) && d <= maxDay && minD)) {
            this.props.getErrorInput(global.t("wrong_day_input_format"));
            return;
          }
        }
      }
      if (mask.length === date.length) {
        const finalDate = new Date(`${Y}-${M}-${D}`);
        const finalDateTime = finalDate.getTime();
        const newDayTime = new Date().getTime();
        this.props.onChange(
          finalDate.toString() === "Invalid Date"
            ? String.prototype.slice.call(this.props.mask).replace(/Y{4}/g, Y).replace(/M{2}/g, M).replace(/D{2}/g, D)
            : finalDate,
        );
        console.log(finalDate);
        Keyboard.dismiss();
        this.props.getDataBirthday({year: Y, month: M, day: D});
        if (this.props.maxYear) {
          if (finalDateTime < newDayTime) {
            this.props.getErrorInput(global.t("error_input_periodOfStay"));
          }
        }
        if (this.props.minYear) {
          if (finalDateTime > newDayTime) {
            console.log("hahahahah");
            this.props.getErrorInput(global.t("error_input_entryDate"));
          }
        }
      }
      // console.log('this.state.date', date);

      this.setState({date});
    }
  }

  render() {
    const {mask, disableInput} = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: "#fff",
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
          value={this.state.date}
          onChangeText={this.handleTextChange.bind(this)}
        />
        {mask.map((v, key) => (
          <TouchableWithoutFeedback disabled={this.props.disableInput} key={key} onPress={() => this.input.focus()}>
            <View style={{paddingHorizontal: this.props.isFromProfile ? 2 : 6}}>
              {v.isTextField ? (
                <View pointerEvents={"none"}>
                  <TextInput
                    placeholder={v.text}
                    placeholderTextColor={"#aaa"}
                    value={this.state.date[v.index]}
                    style={{
                      padding: 2,
                      textAlign: "center",
                      fontSize: this.props.isFromProfile ? 14 : 20,
                      backgroundColor: "#fff",
                      borderBottomWidth: 1,
                      borderBottomColor: this.state.isFocused && this.state.date.length === v.index ? this.props.activeColor : "#aaa",
                      color: "#5D5D5D",
                    }}
                  />
                </View>
              ) : (
                <Text style={{fontSize: 20, color: "#aaa"}}>{v.text}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}
