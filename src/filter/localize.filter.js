import store from "../store";

import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
    'ru-RU': ru,
    'en-US': en,
}

export default function locolizeFilter(key) {
    const locale = store.getters.info.locale || 'ru-RU'
    return locales[locale][key] || `[Locolize error]:key${key} not fiend`
}