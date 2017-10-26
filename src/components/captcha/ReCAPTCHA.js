import makeAsyncScriptLoader from "react-async-script";
import React from "react";
import PropTypes from "prop-types";
const callbackName = "onloadcallback";
const globalName = "grecaptcha";

class ReCAPTCHA extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleRecaptchaRef = this.handleRecaptchaRef.bind(this);
  }

  getValue() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.props.grecaptcha.getResponse(this.state.widgetId);
    }
    return null;
  }

  getWidgetId() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      return this.state.widgetId;
    }
    return null;
  }

  execute() {
    const { grecaptcha } = this.props;
    const { widgetId } = this.state;

    if (grecaptcha && widgetId !== undefined) {
      return grecaptcha.execute(widgetId);
    } else {
      this._executeRequested = true;
    }
  }

  reset() {
    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
      this.props.grecaptcha.reset(this.state.widgetId);
    }
  }

  explicitRender(cb) {
    if (this.props.grecaptcha && this.state.widgetId === undefined) {
      const id = this.props.grecaptcha.render(this.captcha, {
        sitekey: this.props.sitekey,
        callback: (value) => this.props.onChange(null, {name: "recaptcha", value: value}),
        theme: "light",
        type: "image",
        tabindex: 0,
        size: "normal",
        badge: "bottomright",
      });
      this.setState({
        widgetId: id,
      }, cb);
    }
    if (this._executeRequested && this.props.grecaptcha && this.state.widgetId !== undefined) {
      this._executeRequested = false;
      this.execute();
    }
  }

  componentDidMount() {
    this.explicitRender();
  }

  componentDidUpdate() {
    this.explicitRender();
  }

  handleRecaptchaRef(elem) {
    this.captcha = elem;
  }

  render() {
    return (
      <div ref={this.handleRecaptchaRef} />
    );
  }
}

ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  grecaptcha: PropTypes.object
};

export default makeAsyncScriptLoader(ReCAPTCHA, `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit&hl=tr`, {
  callbackName,
  globalName,
  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"],
});