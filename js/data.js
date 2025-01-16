let dataList = [
    {
        id: 1000,
        abbreviation: 'f',
        name: 'f',
        isEducational: false
    },
    {
        id: 1,
        abbreviation: 'АНО',
        name: 'автономная некоммерческая организация',
        isEducational: false
    },
    {
        id: 2,
        abbreviation: 'АНОО',
        name: 'Автономная некоммерческая образовательная организация',
        isEducational: true
    },
    {
        id: 3,
        abbreviation: 'АНОО',
        name: 'АВТОНОМНАЯ НЕКОММЕРЧЕСКАЯ ОБЩЕОБРАЗОВАТЕЛЬНАЯ ОРГАНИЗАЦИЯ',
        isEducational: true
    },
    {
        id: 4,
        abbreviation: 'АО',
        name: 'Акционерное общество',
        isEducational: false
    },
    {
        id: 5,
        abbreviation: 'АО НПО',
        name: 'Акционерное общество "Научно-производственная организация"',
        isEducational: false
    },
    {
        id: 6,
        abbreviation: 'АО НПФ',
        name: 'Акционерное общество "Негосударственный пенсионный фонд"',
        isEducational: false
    },
    {
        id: 7,
        abbreviation: 'АО ПКО',
        name: 'АКЦИОНЕРНОЕ ОБЩЕСТВО ПРОИЗВОДСТВЕННО-КОНСТРУКТОРСКОЕ ОБЪЕДИНЕНИЕ',
        isEducational: false
    },
    {
        id: 8,
        abbreviation: 'БФ',
        name: 'Благотворительный фонд',
        isEducational: false
    },
    {
        id: 9,
        abbreviation: 'Верхневолжский региональный филиал НПФ',
        name: 'Верхневолжский региональный филиал негосударственного пенсионного фонда',
        isEducational: false
    },
    {
        id: 10,
        abbreviation: 'Волжское МТУ по надзору за ЯРБ',
        name: 'Волжское межрегиональное территориальное управление по надзору за ядерной и радиационной безопасности',
        isEducational: false
    },
    {
        id: 11,
        abbreviation: 'ГАУ ДПО НО',
        name: 'Государственное образовательное учреждение дополнительного профессионального образования',
        isEducational: true
    },
    {
        id: 12,
        abbreviation: 'ГБОУ НПО',
        name: 'Государственное бюджетное образовательное учреждение начального профессионального образования',
        isEducational: true
    },
    {
        id: 13,
        abbreviation: 'ГБПОУ',
        name: 'Государственное бюджетное профессиональное образовательное учреждение',
        isEducational: true
    },
    {
        id: 14,
        abbreviation: 'ГБУ НО',
        name: 'Государственное бюджетное учреждение Нижегородской области',
        isEducational: false
    },
    {
        id: 15,
        abbreviation: 'ГБУЗ',
        name: 'Государственное бюджетное учреждение здравоохранения',
        isEducational: false
    },
    {
        id: 16,
        abbreviation: 'ГБУЗ НО',
        name: 'Государственное бюджетное учреждение здравоохранения Нижегородской области',
        isEducational: false
    },
    {
        id: 17,
        abbreviation: 'ГК',
        name: 'Гостиничный комплекс',
        isEducational: false
    },
    {
        id: 18,
        abbreviation: 'ГКОУ',
        name: 'Государственное казенное общеобразовательное учреждение',
        isEducational: true
    },
    {
        id: 19,
        abbreviation: 'ГНООУ Учебный центр',
        name: 'Государственное Нижегородское областное образовательное учреждение  Учебный центр',
        isEducational: true
    },
    {
        id: 20,
        abbreviation: 'Горьковский филиал ОАО',
        name: 'Горьковский филиал Открытого Акционерного Общества',
        isEducational: false
    },
    {
        id: 21,
        abbreviation: 'ГОУ',
        name: 'Государственное образовательное учреждение',
        isEducational: true
    },
    {
        id: 22,
        abbreviation: 'ГОУ ВПО',
        name: 'Государственное образовательное учреждение высшего профессионального образования',
        isEducational: true
    },
    {
        id: 23,
        abbreviation: 'ГОУ ДПО',
        name: 'Государственное образовательное учреждение дополнительного профессионального образования',
        isEducational: true
    },
    {
        id: 24,
        abbreviation: 'ГОУ НПО',
        name: 'Государственное образовательное учреждение начального профессионального образования',
        isEducational: true
    },
    {
        id: 25,
        abbreviation: 'ГП НО',
        name: 'Государственное Предприятие Нижегородской Области',
        isEducational: false
    },
    {
        id: 26,
        abbreviation: 'ГУ',
        name: 'ГЛАВНОЕ УПРАВЛЕНИЕ',
        isEducational: false
    },
    {
        id: 27,
        abbreviation: 'ГУЗ',
        name: 'Государственный университет по землеустройству',
        isEducational: true
    },
    {
        id: 28,
        abbreviation: 'ГУК',
        name: 'Государственное учреждение культуры',
        isEducational: false
    },
    {
        id: 29,
        abbreviation: 'ГУП',
        name: 'Государственное унитарное предприятие',
        isEducational: false
    },
    {
        id: 30,
        abbreviation: 'ГЭПП',
        name: 'Государственное энергетическое производственное предприятие',
        isEducational: false
    },
    {
        id: 31,
        abbreviation: 'ДКБ',
        name: 'ДОРОЖНАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА',
        isEducational: false
    },
    {
        id: 32,
        abbreviation: 'ЗАО',
        name: 'Закрытое Акцианерное Общество',
        isEducational: false
    },
    {
        id: 33,
        abbreviation: 'Избирательное объединение',
        name: 'Избирательное объединение',
        isEducational: false
    },
    {
        id: 34,
        abbreviation: 'ИП',
        name: 'Индивидуальный предприниматель',
        isEducational: false
    },
    {
        id: 35,
        abbreviation: 'КП',
        name: 'Комбинат питания',
        isEducational: false
    },
    {
        id: 36,
        abbreviation: 'Кредитный Потребительский Кооператив',
        name: 'Кредитный Потребительский Кооператив',
        isEducational: false
    },
    {
        id: 37,
        abbreviation: 'КФХ',
        name: 'Крестьянское фермерское хозяйство',
        isEducational: false
    },
    {
        id: 38,
        abbreviation: 'КЦ',
        name: 'Культурный центр',
        isEducational: false
    },
    {
        id: 39,
        abbreviation: 'МАДОУ',
        name: 'Муниципальное автономное дошкольное образовательное учреждение',
        isEducational: true
    },
    {
        id: 40,
        abbreviation: 'МБДОУ',
        name: 'МБДОУ',
        isEducational: true
    },
    {
        id: 41,
        abbreviation: 'МБУ',
        name: 'Муниципальное Бюджетное Учреждение',
        isEducational: true
    },
    {
        id: 42,
        abbreviation: 'МБУ ДО',
        name: 'Муниципальное Бюджетное Учреждение Дополнительного Образования',
        isEducational: true
    },
    {
        id: 43,
        abbreviation: 'МДОУ',
        name: 'Муниципальное дошкольное образовательное учрежение',
        isEducational: true
    },
    {
        id: 44,
        abbreviation: 'МКУ',
        name: 'Муниципальное казенное учреждение',
        isEducational: false
    },
    {
        id: 45,
        abbreviation: 'МЛПУ',
        name: 'Муниципальное лечебно-профилактическое учреждение',
        isEducational: false
    },
    {
        id: 46,
        abbreviation: 'МОУ',
        name: 'Муниципальное образовательное учрежение',
        isEducational: true
    },
    {
        id: 47,
        abbreviation: 'МП',
        name: 'Малое предприятие',
        isEducational: false
    },
    {
        id: 48,
        abbreviation: 'МП',
        name: 'Муниципальное предприятие',
        isEducational: false
    },
    {
        id: 49,
        abbreviation: 'МП города Нижнего Новгорода',
        name: 'Муниципальное предприятие города Нижнего Новгорода',
        isEducational: false
    },
    {
        id: 50,
        abbreviation: 'МУ',
        name: 'Муниципальное Управление',
        isEducational: false
    },
    {
        id: 51,
        abbreviation: 'МУК',
        name: 'Муниципальное учрежение культуры',
        isEducational: false
    },
    {
        id: 52,
        abbreviation: 'Муниципальное автономное учреждение культуры',
        name: 'Муниципальное автономное учреждение культуры',
        isEducational: false
    },
    {
        id: 53,
        abbreviation: 'Муниципальное автономное учреждение муниципальный центр',
        name: 'Муниципальное автономное учреждение культуры',
        isEducational: false
    },
    {
        id: 54,
        abbreviation: 'Муниципальное автономное учреждение муниципальный центр',
        name: 'Муниципальное автономное учреждение муниципальный центр',
        isEducational: false
    },
    {
        id: 55,
        abbreviation: 'МУП',
        name: 'Муниципальное унитарное предприятие',
        isEducational: false
    },
    {
        id: 56,
        abbreviation: 'НАО',
        name: 'Некоммерческое  акционерное общество',
        isEducational: false
    },
    {
        id: 57,
        abbreviation: 'Нижегородский филиал АО',
        name: 'Нижегородский филиал Акционерного общества',
        isEducational: false
    },
    {
        id: 58,
        abbreviation: 'Нижегородский филиал ООО',
        name: 'Нижегородский филиал Общества с ограниченной ответственностью',
        isEducational: false
    },
    {
        id: 59,
        abbreviation: 'Нижегородский филиал СОАО',
        name: 'Нижегородский филиал Страховое открытое акционерное общество',
        isEducational: false
    },
    {
        id: 60,
        abbreviation: 'НОАО',
        name: 'Некоммерческое открытое акционерное общество',
        isEducational: false
    },
    {
        id: 61,
        abbreviation: 'НОУ',
        name: 'Негосударственное образовательное учреждение',
        isEducational: true
    },
    {
        id: 62,
        abbreviation: 'НОЧУ',
        name: 'Негосударственное образовательное частное учреждение',
        isEducational: true
    },
    {
        id: 63,
        abbreviation: 'НП',
        name: 'Некоммерческое партнерство',
        isEducational: false
    },
    {
        id: 64,
        abbreviation: 'НУЗ',
        name: 'Негосударственное учреждение здравоохранения',
        isEducational: false
    },
    {
        id: 65,
        abbreviation: 'НФ ГУ',
        name: 'Нижегородского филиала Государственного университета',
        isEducational: true
    },
    {
        id: 66,
        abbreviation: 'НФ ГУ-ВШЭ',
        name: 'Нижегородского филиала Государственного университета Высшей школы экономики',
        isEducational: true
    },
    {
        id: 67,
        abbreviation: 'ОАО',
        name: 'Открытое акционерное общество',
        isEducational: false
    },
    {
        id: 68,
        abbreviation: 'ООО',
        name: 'Общество с ограниченной ответственностью',
        isEducational: false
    },
    {
        id: 69,
        abbreviation: 'ООО  ПРОИЗВОДСТВЕННО-СТРОИТЕЛЬНАЯ КОМПАНИЯ',
        name: 'Общество с ограниченной ответственностью  ПРОИЗВОДСТВЕННО-СТРОИТЕЛЬНАЯ КОМПАНИЯ',
        isEducational: false
    },
    {
        id: 70,
        abbreviation: 'ООО "ТД"',
        name: 'Общество с ограниченной ответственностью "Торговый дом"',
        isEducational: false
    },
    {
        id: 71,
        abbreviation: 'ООО "ИЗДАТЕЛЬСКИЙ ДОМ"',
        name: 'Общество с ограниченной ответственностью "ИЗДАТЕЛЬСКИЙ ДОМ"',
        isEducational: false
    },
    {
        id: 72,
        abbreviation: 'ООО "ИЮБ"',
        name: 'Общество с ограниченной ответственностью "Информационно-юридическое бюро"',
        isEducational: false
    },
    {
        id: 73,
        abbreviation: 'ООО "ННПЦ"',
        name: 'Общество с ограниченной ответственностью "Нижегородский научно-производственный центр"',
        isEducational: false
    },
    {
        id: 74,
        abbreviation: 'ООО "НПО"',
        name: 'Общество с ограниченной ответственностью "Научно-производственное объединение"',
        isEducational: false
    },
    {
        id: 75,
        abbreviation: 'ООО "НПФ"',
        name: 'Общество с ограниченной ответственностью "Научно-производственная фирма"',
        isEducational: false
    },
    {
        id: 76,
        abbreviation: 'ООО "ПО"',
        name: 'Общество с ограниченной ответственностью "Производственное объединение"',
        isEducational: false
    },
    {
        id: 77,
        abbreviation: 'ООО "ППИЦ"',
        name: 'Общество с ограниченной ответственностью "Проектно-производственный и информационный центр"',
        isEducational: false
    },
    {
        id: 78,
        abbreviation: 'ООО "Предприятие"',
        name: 'Общество с ограниченной ответственностью "Предприятие"',
        isEducational: false
    },
    {
        id: 79,
        abbreviation: 'ООО "ПТФ"',
        name: 'Общество с ограниченной ответственностью "Производственно-торговая фирма"',
        isEducational: false
    },
    {
        id: 80,
        abbreviation: 'ООО "ПТЦ"',
        name: 'Общество с ограниченной ответственностью "Производственно-технический центр"',
        isEducational: false
    },
    {
        id: 81,
        abbreviation: 'ООО "ПШО"',
        name: 'Общество с ограниченной ответственностью "Производственное швейное объединение"',
        isEducational: false
    },
    {
        id: 82,
        abbreviation: 'ООО "РА"',
        name: 'Общество с ограниченной ответственностью "Рекламное агентство"',
        isEducational: false
    },
    {
        id: 83,
        abbreviation: 'ООО "Рекламная группа"',
        name: 'Общество с ограниченной ответственностью "Рекламная группа"',
        isEducational: false
    },
    {
        id: 84,
        abbreviation: 'ООО "Страховая группа"',
        name: 'Общество с ограниченной ответственностью "Страховая группа"',
        isEducational: false
    },
    {
        id: 85,
        abbreviation: 'ООО "СФК"',
        name: 'Общество с ограниченной ответственностью "Строительно-финансовая компания"',
        isEducational: false
    },
    {
        id: 86,
        abbreviation: 'ООО "Торговая компания"',
        name: 'Общество с ограниченной ответственностью "Торговая компания"',
        isEducational: false
    },
    {
        id: 87,
        abbreviation: 'ООО "Торговый дом"',
        name: 'Общество с ограниченной ответственностью "Торговый дом"',
        isEducational: false
    },
    {
        id: 88,
        abbreviation: 'ООО "Ук"',
        name: 'Общество с ограниченной ответственностью "Управляющая компания"',
        isEducational: false
    },
    {
        id: 89,
        abbreviation: 'ООО "Управляющая компания"',
        name: 'Общество с ограниченной ответственностью "Управляющая компания"',
        isEducational: false
    },
    {
        id: 90,
        abbreviation: 'ООО "Фирма"',
        name: 'Общество с ограниченной ответственностью "Фирма"',
        isEducational: false
    },
    {
        id: 91,
        abbreviation: 'ООО "ЧОА"',
        name: 'Общество с ограниченной ответственностью "Частное охранное агентство"',
        isEducational: false
    },
    {
        id: 92,
        abbreviation: 'ООО "Частное охранное предприятие"',
        name: 'Общество с ограниченной ответственностью "Частное охранное предприятие"',
        isEducational: false
    },
    {
        id: 93,
        abbreviation: 'ООО "ЧППФ"',
        name: 'Общество с ограниченной ответственностью "Частное предприятие производственная фирма"',
        isEducational: false
    },
    {
        id: 94,
        abbreviation: 'ООО "Ювелирная студия"',
        name: 'Общество с ограниченной ответственностью "Ювелирная студия"',
        isEducational: false
    },
    {
        id: 95,
        abbreviation: 'ООО Агенство недвижимости',
        name: 'Общество с ограниченной ответственностью Агенство недвижимости',
        isEducational: false
    },
    {
        id: 96,
        abbreviation: 'ООО ГК',
        name: 'Общество с ограниченной ответственностью Группа компаний',
        isEducational: false
    },
    {
        id: 97,
        abbreviation: 'ООО НПК',
        name: 'Общество с ограниченной ответственностью Научно-производственная компания',
        isEducational: false
    },
    {
        id: 98,
        abbreviation: 'ООО НПО',
        name: 'Общество с ограниченной ответственностью Научно-производственное объединение',
        isEducational: false
    },
    {
        id: 99,
        abbreviation: 'ООО НПП',
        name: 'Общество с ограниченной ответственностью Научно-производственное предприятие',
        isEducational: false
    },
    {
        id: 100,
        abbreviation: 'ООО НПФ',
        name: 'Общество с ограниченной ответственностью Научно-производственная фирма',
        isEducational: false
    },
    {
        id: 101,
        abbreviation: 'ООО НПЦ',
        name: 'Общество с ограниченной ответственностью Научно-производственный центр',
        isEducational: false
    },
    {
        id: 102,
        abbreviation: 'ООО НТП',
        name: 'Общество с ограниченной ответственностью Научно-техническое предприятие',
        isEducational: false
    },
    {
        id: 103,
        abbreviation: 'ООО НТУ',
        name: 'Общество с ограниченной ответственностью Нижегородские технологии утепления',
        isEducational: false
    },
    {
        id: 103,
        abbreviation: 'ООО О',
        name: 'Общество с ограниченной ответственностью ответственностью Объединение',
        isEducational: false
    },
    {
        id: 104,
        abbreviation: 'ООО ОА',
        name: 'Общество с ограниченной ответственностью Охранное агентство',
        isEducational: false
    },
    {
        id: 105,
        abbreviation: 'ООО ОП',
        name: 'Общество с ограниченной ответственностью Охранное предприятие',
        isEducational: false
    },
    {
        id: 106,
        abbreviation: 'ООО Охранная фирма',
        name: 'Общество с ограниченной ответственностью Охранная фирма',
        isEducational: false
    },
    {
        id: 107,
        abbreviation: 'ООО Охранное предприятие',
        name: 'Общество с ограниченной ответственностью Охранное предприятие',
        isEducational: false
    },
    {
        id: 108,
        abbreviation: 'ООО ПК',
        name: 'Общество с ограниченной ответственностью Производственная компания',
        isEducational: false
    },
    {
        id: 109,
        abbreviation: 'ООО ПКК',
        name: 'Общество с ограниченной ответственностью Производственно-Коммерческая Компания',
        isEducational: false
    },
    {
        id: 110,
        abbreviation: 'ООО ПКП',
        name: 'Общество с ограниченной ответственностью Промышленно-коммерческое предприятие',
        isEducational: false
    },
    {
        id: 111,
        abbreviation: 'ООО ПКФ',
        name: 'Общество с ограниченной ответственностью Производственно-коммерческая фирма',
        isEducational: false
    },
    {
        id: 112,
        abbreviation: 'ООО ПТО',
        name: 'Общество с ограниченной ответственностью Производственно-творческое объединение',
        isEducational: false
    },
    {
        id: 113,
        abbreviation: 'ООО ПТЦ',
        name: 'Общество с ограниченной ответственностью Производственно-торговый центр',
        isEducational: false
    },
    {
        id: 114,
        abbreviation: 'ООО ПТЦ',
        name: 'Общество с ограниченной ответственностью Производственно-технологический центр',
        isEducational: false
    },
    {
        id: 115,
        abbreviation: 'ООО ПФ',
        name: 'Общество с ограниченной ответственностью Производственная фирма',
        isEducational: false
    },
    {
        id: 116,
        abbreviation: 'ООО РИА',
        name: 'Общество с ограниченной ответственностью Региональное информационное агентство',
        isEducational: false
    },
    {
        id: 117,
        abbreviation: 'ООО РК',
        name: 'Общество с ограниченной ответственностью Риэлтерская компания',
        isEducational: false
    },
    {
        id: 118,
        abbreviation: 'ООО сельскохозяйственное предприятие',
        name: 'Общество с ограниченной ответственностью сельскохозяйственное предприятие',
        isEducational: false
    },
    {
        id: 119,
        abbreviation: 'ООО СК',
        name: 'Общество с ограниченной ответственностью СК',
        isEducational: false
    },
    {
        id: 120,
        abbreviation: 'ООО СКО',
        name: 'Общество с ограниченной ответственностью СКО',
        isEducational: false
    },
    {
        id: 121,
        abbreviation: 'ООО СО',
        name: 'Общество с ограниченной ответственностью СО',
        isEducational: false
    },
    {
        id: 122,
        abbreviation: 'ООО СОА',
        name: 'Общество с ограниченной ответственностью СОА',
        isEducational: false
    },
    {
        id: 123,
        abbreviation: 'ООО СП',
        name: 'Общество с ограниченной ответственностью СП',
        isEducational: false
    },
    {
        id: 124,
        abbreviation: 'ООО СПК',
        name: 'Общество с ограниченной ответственностью Сельскохозяйственный производственный кооператив',
        isEducational: false
    },
    {
        id: 125,
        abbreviation: 'ООО Судостроительная компания',
        name: 'Общество с ограниченной ответственностью Судостроительная компания',
        isEducational: false
    },
    {
        id: 126,
        abbreviation: 'ООО СХ',
        name: 'Общество с ограниченной ответственностью СХ',
        isEducational: false
    },
    {
        id: 127,
        abbreviation: 'ООО ТА',
        name: 'Общество с ограниченной ответственностью ТА',
        isEducational: false
    },
    {
        id: 128,
        abbreviation: 'ООО ТД',
        name: 'Общество с ограниченной ответственностью ТД',
        isEducational: false
    },
    {
        id: 129,
        abbreviation: 'ООО Торговая компания',
        name: 'Общество с ограниченной ответственностью ТК',
        isEducational: false
    },
    {
        id: 130,
        abbreviation: 'ООО Торговый дом',
        name: 'Общество с ограниченной ответственностью Тороговый дом',
        isEducational: false
    },
    {
        id: 131,
        abbreviation: 'ООО ТФ',
        name: 'Общество с ограниченной ответственностью ТФ',
        isEducational: false
    },
    {
        id: 132,
        abbreviation: 'ООО ТЦРВ',
        name: 'Общество с ограниченной ответственностью ТЦРВ',
        isEducational: false
    },
    {
        id: 133,
        abbreviation: 'ООО УК',
        name: 'Общество с ограниченной ответственностью управляющая компания',
        isEducational: false
    },
    {
        id: 134,
        abbreviation: 'ООО Фирма',
        name: 'Общество с ограниченной ответственностью фирма',
        isEducational: false
    },
    {
        id: 135,
        abbreviation: 'ООО ЦДА',
        name: 'ООО Центр доработки автомобилей',
        isEducational: false
    },
    {
        id: 136,
        abbreviation: 'ООО ЧОО',
        name: 'ООО Частная охранная организация',
        isEducational: false
    },
    {
        id: 137,
        abbreviation: 'ООО Частное агенство занятости',
        name: 'Общество с ограниченной ответственностью частное агентство занятости',
        isEducational: false
    },
    {
        id: 138,
        abbreviation: 'ООО ЧОО',
        name: 'Общество с ограниченной ответственностью ЧОО',
        isEducational: false
    },
    {
        id: 139,
        abbreviation: 'ООО ЧОП',
        name: 'Общество с ограниченной ответственностью ЧОП',
        isEducational: false
    },
    {
        id: 140,
        abbreviation: 'ООО ЧОФ',
        name: 'Общество с ограниченной ответственностью ЧОФ',
        isEducational: false
    },
    {
        id: 141,
        abbreviation: 'ПАО',
        name: 'Публичное акционерное общество',
        isEducational: false
    },
    {
        id: 142,
        abbreviation: 'ПАО ПКО',
        name: 'Публичное акционерное общество',
        isEducational: false
    },
    {
        id: 143,
        abbreviation: 'ПБОЮЛ',
        name: 'Предприниматель (осуществляющий деятельность) без образования юридического лица',
        isEducational: false
    },
    {
        id: 144,
        abbreviation: 'ТСЖ',
        name: 'Товарищество собственников жилья',
        isEducational: false
    },
    {
        id: 145,
        abbreviation: 'ТСН',
        name: 'ТОВАРИЩЕСТВО СОБСТВЕННИКОВ НЕДВИЖИМОСТИ',
        isEducational: false
    },
    {
        id: 146,
        abbreviation: 'ФБУ',
        name: 'Федеральное бюджетное учреждение',
        isEducational: false
    },
    {
        id: 146,
        abbreviation: 'ФБУ',
        name: 'Федеральное бюджетное учреждение',
        isEducational: false
    },
    {
        id: 147,
        abbreviation: 'ФБУЗ',
        name: 'Федеральное бюджетное учреждение здравоохранение',
        isEducational: false
    },
    {
        id: 148,
        abbreviation: 'ФБУН',
        name: 'Федеральное бюджетное учреждение науки',
        isEducational: false
    },
    {
        id: 149,
        abbreviation: 'ФГП',
        name: 'Федеральное государственное  предприятие',
        isEducational: false
    },
    {
        id: 150,
        abbreviation: 'ФГУП',
        name: 'Федеральное государственное унитарное предприятие',
        isEducational: false
    },
    {
        id: 151,
        abbreviation: 'Федеральное Государственное Унитарное Предприятие',
        name: 'Федеральное Государственное Унитарное Предприятие',
        isEducational: false
    },
    {
        id: 152,
        abbreviation: 'ФКП',
        name: 'Федеральное казенное предприятие',
        isEducational: false
    },
    {
        id: 153,
        abbreviation: 'ЧОУ',
        name: 'Частное образовательное учреждение',
        isEducational: false
    },
    {
        id: 154,
        abbreviation: 'ЧП',
        name: 'Частный предприниматель',
        isEducational: false
    },
    {
        id: 155,
        abbreviation: 'ЧУДДО',
        name: 'Частное учреждение дошкольного и дополнительного образования',
        isEducational: true
    },
    {
        id: 156,
        abbreviation: 'ЧУЗ',
        name: 'Частное  учреждение здравоохранения',
        isEducational: false
    },
]

export {dataList}
