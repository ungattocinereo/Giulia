// The client's flowchart, 4 November 2026. Keep both motivation branches:
// they merge at `events`, as does the "not 14–18" branch.
export const QUIZ_VERSION = '2026-11-04';
export const QUIZ_MAX_QUESTIONS = 5;
export const QUIZ_MESSAGE_LIMIT = 1500;

export const quizQuestions = {
    age: {
        title: 'Вашему подростку 14–18 лет?',
        hint: 'Начнём с возраста. Это поможет выбрать следующие вопросы.',
        icon: 'compass', yes: 'time', no: 'events',
    },
    time: {
        title: 'Есть ли время на длительную работу по самоопределению?',
        hint: 'Можно постепенно исследовать интересы и пробовать новое — или с направлением поступления нужно определиться в ближайшее время?',
        yesLabel: 'Да, есть время', noLabel: 'Нет, нужно определиться скорее',
        icon: 'calendar', yes: 'motivation', no: 'result:career',
    },
    motivation: {
        title: 'Есть ли у подростка трудности с мотивацией?',
        hint: 'Например, сложно начать действовать, поддерживать интерес или понять, ради чего прикладывать усилия.',
        icon: 'lightbulb', yes: 'events', no: 'events',
    },
    events: {
        title: 'Есть ли события, которые сейчас влияют на эмоциональное состояние ребёнка?',
        hint: 'Вспомните то, что происходит сейчас или было раньше. Подробности рассказывать здесь не нужно.',
        examples: ['Развод родителей или смерть близких', 'Смена школы, рождение братьев или сестёр', 'Буллинг, хронические заболевания', 'Сложные отношения с родными или друзьями'],
        icon: 'shield', yes: 'family', no: 'interest',
    },
    interest: {
        title: 'Есть ли у подростка интерес к изучению себя?',
        hint: 'Интересно ли ему искать ответы на такие вопросы?',
        examples: ['Какой я? Что мне нравится, а что не подходит?', 'Какие у меня ценности?', 'Как стать более взрослым?'],
        icon: 'leaf', yes: 'result:tutoring', no: 'result:career',
    },
    family: {
        title: 'Готова ли семья участвовать в семейной терапии?',
        hint: 'Встречаться могут только родители или один родитель, а также родители вместе с подростком.',
        yesLabel: 'Да, готовы участвовать', noLabel: 'Нет, пока не готовы',
        icon: 'people', yes: 'result:family', no: 'result:psychologist',
    },
};

export const quizResults = {
    career: {
        id: 'career', anchor: 'career-guidance', title: 'Профориентация', icon: 'compass',
        teaser: 'Выбрать 1–2 направления учёбы и понять, что точно не подходит.',
        summary: 'По вашим ответам можно начать с профориентации. За одну неделю — отсеять варианты, которые точно не подходят вашему ребёнку, и определить 1–2 направления, на которые лучше сделать ставку при поступлении.',
        details: ['Быстрый ориентир для выбора направления.', 'Дальнейшие шаги обсудим с учётом вашей ситуации.'],
    },
    tutoring: {
        id: 'tutoring', anchor: 'tutoring', title: 'Тьюторское сопровождение', icon: 'leaf',
        teaser: 'Исследовать себя и научиться опираться на себя в выборе.',
        summary: 'По вашим ответам подростку может быть полезна работа с тьютором. Это пространство, где можно исследовать себя и постепенно становиться автором собственных решений.',
        details: ['Учиться принимать самостоятельные решения и ответственность.', 'Исследовать интересы, ценности и свои опоры.', 'Практиковаться в выборе с поддержкой взрослого.'],
    },
    psychologist: {
        id: 'psychologist', anchor: 'psychological-work', title: 'Индивидуальная работа с психологом', icon: 'shield',
        teaser: 'Поддержать подростка в сложных переживаниях и переменах.',
        summary: 'По вашим ответам лучше начать с индивидуальной работы подростка с психологом. Она поможет уделить внимание переживаниям и тому, что сейчас влияет на его состояние.',
        details: ['Примерно раз в месяц понадобятся встречи с родителем, родителями или другими значимыми взрослыми.', 'При необходимости можно добавить профориентацию или тьюторское сопровождение.'],
    },
    family: {
        id: 'family', anchor: 'family-therapy', title: 'Семейная терапия', icon: 'people',
        teaser: 'Начать с совместной работы и поддержать семью в целом.',
        summary: 'По вашим ответам лучше начать с совместной работы. Встречаться могут только родители или один родитель, а также родители вместе с подростком — состав участников обсудим при знакомстве.',
        details: ['Внимание к семье в целом, каждому её участнику и отношениям между ними.', 'При необходимости можно добавить профориентацию или тьюторское сопровождение.'],
    },
};

export function getQuizState(answers = []) {
    if (!Array.isArray(answers) || answers.length > QUIZ_MAX_QUESTIONS) throw new Error('Некорректные ответы теста');
    let node = 'age';
    const path = [];
    for (const answer of answers) {
        if (typeof answer !== 'boolean' || !quizQuestions[node]) throw new Error('Некорректный путь теста');
        const question = quizQuestions[node];
        path.push({ id: node, title: question.title, answer, label: answer ? 'Да' : 'Нет' });
        node = question[answer ? 'yes' : 'no'];
    }
    const resultId = node.startsWith('result:') ? node.slice(7) : null;
    return { questionId: resultId ? null : node, question: quizQuestions[node] || null, result: quizResults[resultId] || null, path };
}

export function getQuizReport(answers) {
    const { result, path } = getQuizState(answers);
    if (!result) throw new Error('Сначала завершите подбор консультации');
    return { result, text: `Тест «Какая консультация нужна подростку?» (${QUIZ_VERSION})\nРекомендация сайта: ${result.title}\n\nОтветы:\n${path.map((step, index) => `${index + 1}. ${step.title} — ${step.label}`).join('\n')}` };
}
