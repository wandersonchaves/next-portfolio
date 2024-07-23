import {Fira_Code, Onest, Plus_Jakarta_Sans, Sora} from 'next/font/google'

let jakartaSans, firaCode, soraSans, onestSans

try {
  jakartaSans = Plus_Jakarta_Sans({
    variable: '--jakartaSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['400', '500', '600', '700', '800'],
  })
} catch (error) {
  console.error('Failed to load Plus Jakarta Sans font:', error)
}

try {
  firaCode = Fira_Code({
    variable: '--font-fira-code',
    subsets: ['latin'],
    display: 'swap',
  })
} catch (error) {
  console.error('Failed to load Fira Code font:', error)
}

try {
  soraSans = Sora({
    variable: '--soraSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['300', '400', '500', '600', '700', '800'],
  })
} catch (error) {
  console.error('Failed to load Sora font:', error)
}

try {
  onestSans = Onest({
    variable: '--onestSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['300', '400', '500', '600', '700', '800'],
  })
} catch (error) {
  console.error('Failed to load Onest font:', error)
}

export {firaCode, jakartaSans, onestSans,soraSans}
