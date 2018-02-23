var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var formattedSeconds = function formattedSeconds(sec) {
  return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);
};

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      secondsElapsed: 60,
      laps: [],
      lastClearedIncrementer: null
    };
    _this.incrementer = null;
    return _this;
  }

  _createClass(Stopwatch, [{
    key: 'handleStartClick',
    value: function handleStartClick() {
      var _this2 = this;

      this.incrementer = setInterval(function () {
        return _this2.setState({
          secondsElapsed: _this2.state.secondsElapsed - 1
        });
      }, 1000);
    }
  }, {
    key: 'handleStopClick',
    value: function handleStopClick() {
      clearInterval(this.incrementer);
      this.setState({
        lastClearedIncrementer: this.incrementer
      });
    }
  }, {
    key: 'handleResetClick',
    value: function handleResetClick() {
      clearInterval(this.incrementer);
      this.setState({
        secondsElapsed: 60,
        laps: []
      });
    }
  }, {
    key: 'handleLabClick',
    value: function handleLabClick() {
      this.setState({
        laps: this.state.laps.concat([this.state.secondsElapsed])
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'stopwatch' },
        React.createElement(
          'h1',
          { className: 'stopwatch-timer' },
          formattedSeconds(this.state.secondsElapsed)
        ),
        this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer ? React.createElement(
          Button,
          { className: 'start-btn', onClick: this.handleStartClick.bind(this) },
          'start'
        ) : React.createElement(
          Button,
          { className: 'stop-btn', onClick: this.handleStopClick.bind(this) },
          'stop'
        ),
        // this.state.secondsElapsed !== 0 && this.incrementer !== this.state.lastClearedIncrementer ? React.createElement(
        //   Button,
        //   { onClick: this.handleLabClick.bind(this) },
        //   'lab'
        // ) : null,
        this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer ? React.createElement(
          Button,
          { onClick: this.handleResetClick.bind(this) },
          'reset'
        ) : null,
        React.createElement(
          'ul',
          { className: 'stopwatch-laps' },
          this.state.laps.map(function (lap, i) {
            return React.createElement(
              'li',
              { className: 'stopwatch-lap' },
              React.createElement(
                'strong',
                null,
                i + 1
              ),
              '/ ',
              formattedSeconds(lap)
            );
          })
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

/** verbose component before 0.14
class Button extends React.Component {
  render() {
    return <button type="button" {...this.props}
                   className={"btn " + this.props.className } />;
  }
}
*/

var Button = function Button(props) {
  return React.createElement('button', _extends({ type: 'button' }, props, { className: "btn " + props.className }));
};

React.render(React.createElement(Stopwatch, null), document.getElementById('timer'));
