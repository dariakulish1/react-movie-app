import { useTranslation } from 'react-i18next';

export const locales = {
  en: { title: 'English' },
  it: { title: 'Italian' },
  uk: { title: 'Ukrainian' },
};

export const LangBtn = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('main.header')}</h1>
      <ul
        style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'row',
          height: '60px',
          justifyContent: 'space-between',
        }}
      >
        {Object.keys(locales).map((locale) => (
          <li
            key={locale}
            style={{
              padding: '10px',
            }}
          >
            <button
              className="inter cursor"
              style={{
                fontWeight:
                  i18n.resolvedLanguage === locale ? 'bold' : 'normal',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid black',
                background: 'none',
                hover: {
                  background: 'red',
                },
              }}
              type="submit"
              onClick={() => i18n.changeLanguage(locale)}
            >
              {locales[locale].title}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
