import type {NextFont} from 'next/dist/compiled/@next/font'
import {Fira_Code, Onest, Plus_Jakarta_Sans, Sora} from 'next/font/google'

export let jakartaSans: NextFont | undefined
export let firaCode: NextFont | undefined
export let soraSans: NextFont | undefined
export let onestSans: NextFont | undefined

try {
  jakartaSans = Plus_Jakarta_Sans({
    variable: '--jakartaSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['400', '500', '600', '700', '800'],
  })
} catch (error) {
  // Você pode querer logar isso em um serviço de log em produção
}

try {
  firaCode = Fira_Code({
    variable: '--font-fira-code',
    subsets: ['latin'],
    display: 'swap',
  })
} catch (error) {
  // Você pode querer logar isso em um serviço de log em produção
}

try {
  soraSans = Sora({
    variable: '--soraSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['300', '400', '500', '600', '700', '800'],
  })
} catch (error) {
  // Você pode querer logar isso em um serviço de log em produção
}

try {
  onestSans = Onest({
    variable: '--onestSans-font',
    subsets: ['latin'],
    display: 'fallback',
    weight: ['300', '400', '500', '600', '700', '800'],
  })
} catch (error) {
  // Você pode querer logar isso em um serviço de log em produção
}
