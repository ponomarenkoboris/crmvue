import store from '../store' 
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const lacales = {
    'ru-RU': ru,
    'en-US': en
}

export default function localizeFilter(key) {
    const locale = store.getters.info.local || 'ru-RU';
    return lacales[locale][key] || `[Localize error]: key ${key} not found` 
}