function Button(props) {
  return React.createElement(
    'button',
    { onClick: props.onClick },
    'Say Hello'
  );
}

function HelloButton() {
  function handleClick() {
    alert('Hello!');
  }
  return React.createElement(Button, { onClick: handleClick });
}

ReactDOM.render(React.createElement(HelloButton, null), document.getElementById('container'));