import React from 'react'

import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert
} from 'react-native';


const Message = ({ variant, children }) => {
  return <Text >{children}</Text>
}
Message.defaultProps = {
  variant: 'info',
}

export default Message
