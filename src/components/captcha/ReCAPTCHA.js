import makeAsyncScriptLoader from "react-async-script";
import React from "react";
import PropTypes from "prop-types";
const callbackName = "onloadcallback";
const URL = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit&hl=tr`;
const globalName = "grecaptcha";

class ReCAPTCHA extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleExpired = this.handleExpired.bind(this);
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

  handleExpired() {
    if (this.props.onExpired) {
      this.props.onExpired();
    } else if (this.props.onChange) {
      this.props.onChange(null, {name: "recaptcha", value: null});
    }
  }

  explicitRender(cb) {
    if (this.props.grecaptcha && this.state.widgetId === undefined) {
      const id = this.props.grecaptcha.render(this.captcha, {
        sitekey: this.props.sitekey,
        callback: (value) => this.props.onChange(null, {name: "recaptcha", value: value}),
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        size: this.props.size,
        stoken: this.props.stoken,
        badge: this.props.badge,
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
    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
    /* eslint-disable no-unused-vars */
    const { sitekey, onChange, theme, type, tabindex, onExpired, size, stoken, grecaptcha, badge, ...childProps } = this.props;
    /* eslint-enable no-unused-vars */
    return (
      <div {...childProps} ref={this.handleRecaptchaRef} />
    );
  }
}

ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
};

ReCAPTCHA.defaultProps = {
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright",
};

export default makeAsyncScriptLoader(ReCAPTCHA, URL, {
  callbackName,
  globalName,
  exposeFuncs: ["getValue", "getWidgetId", "reset", "execute"],
});