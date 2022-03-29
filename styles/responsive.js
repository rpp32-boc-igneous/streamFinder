// import { ScaledSize, StyleProp, StyleSheet } from 'react-native'

// export default function CreateResponsiveStyle(
//   webStyles: StyleSheet.NamedStyles<T>,
//   mobileStyles: StyleSheet.NamedStyles<U>,
// ) {
//   const web = StyleSheet.create(StyleSheet.NamedStyles(webStyles))
//   const mobile = StyleSheet.create(StyleSheet.NamedStyles(mobileStyles))

//   // Return a function that combines wraps web and mobile styles
//   return (ScaledSize) => (style: keyof T): StyleProp => {
//     if (layout.width < 768 && mobile.hasOwnProperty(style)) {
//       return StyleSheet.compose(web[style], mobile[style])
//     } else return web[style]
//   }
// }