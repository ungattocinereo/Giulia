import { site, sessions, services, faqs } from '../../src/content/site.js';

export const absolute = value => new URL(value, site.url).href;
const personId = `${site.url}#person`;
const webpageId = `${site.url}#webpage`;

export function structuredData() {
    const offers = [sessions[0], ...services].map((service, index) => ({
        '@type': 'Offer', '@id': `${site.url}#offer-${index}`,
        name: service.title, url: `${site.url}#${index === 0 ? 'pricing' : 'comprehensive-approach'}`, priceCurrency: 'RUB',
        ...(service.fromPrice ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: service.priceValue, priceCurrency: 'RUB' } } : { price: service.priceValue }),
        itemOffered: {
            '@type': 'Service', name: service.title,
            description: service.description || service.text,
            provider: { '@id': personId },
            areaServed: { '@type': 'City', name: site.city },
            availableChannel: [
                { '@type': 'ServiceChannel', serviceUrl: `${site.url}#contacts` },
                { '@type': 'ServiceChannel', serviceLocation: { '@type': 'City', name: site.city } },
            ],
        },
    }));
    return {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'Person', '@id': personId, name: site.name, url: site.url,
                jobTitle: site.roles, description: site.description,
                image: absolute(site.image), email: site.email, telephone: site.phone,
                workLocation: { '@type': 'City', name: site.city },
                knowsLanguage: 'ru', sameAs: [site.telegram],
            },
            { '@type': 'WebSite', '@id': `${site.url}#website`, name: `${site.name} — ${site.brand}`,
                url: site.url, inLanguage: 'ru-RU', publisher: { '@id': personId },
            },
            { '@type': 'WebPage', '@id': webpageId, name: site.title,
                url: site.url, description: site.description, inLanguage: 'ru-RU',
                isPartOf: { '@id': `${site.url}#website` }, about: { '@id': personId },
                primaryImageOfPage: { '@type': 'ImageObject', url: absolute(site.socialImage) },
            },
            { '@type': 'Service', '@id': `${site.url}#services`,
                name: 'Психологические консультации, тьюторское сопровождение и профориентация',
                serviceType: ['Психологическая консультация', 'Тьюторская сессия', 'Профориентация'],
                provider: { '@id': personId }, url: `${site.url}#comprehensive-approach`,
                description: 'Для детей, подростков и взрослых. Онлайн и очно в Москве.',
                areaServed: { '@type': 'City', name: site.city },
                hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Форматы работы и стоимость', itemListElement: offers },
            },
            { '@type': 'FAQPage', '@id': `${site.url}#faq`, url: `${site.url}#faq`,
                isPartOf: { '@id': webpageId }, inLanguage: 'ru-RU',
                mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.paragraphs.join(' ') },
                })),
            },
        ],
    };
}

const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const tag = (attribute, name, value) => `<meta ${attribute}="${name}" content="${escape(value)}" />`;

export function metaHead(images) {
    return [
        `<title>${escape(site.title)}</title>`,
        tag('name', 'description', site.description),
        tag('name', 'author', site.name),
        tag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
        tag('name', 'theme-color', '#31513C'),
        `<link rel="canonical" href="${site.url}" />`,
        `<link rel="alternate" type="text/markdown" href="${absolute('/llms.txt')}" title="Информация о Юлии Поповой" />`,
        tag('property', 'og:type', 'website'), tag('property', 'og:url', site.url),
        tag('property', 'og:site_name', site.name), tag('property', 'og:locale', 'ru_RU'),
        tag('property', 'og:title', site.title), tag('property', 'og:description', site.description),
        tag('property', 'og:image', absolute(site.socialImage)),
        tag('property', 'og:image:secure_url', absolute(site.socialImage)),
        tag('property', 'og:image:type', 'image/png'),
        tag('property', 'og:image:width', images.og.width), tag('property', 'og:image:height', images.og.height),
        tag('property', 'og:image:alt', 'Юлия Попова — психолог, тьютор и профориентолог. Онлайн и очно в Москве.'),
        tag('name', 'twitter:card', 'summary_large_image'),
        tag('name', 'twitter:title', site.title), tag('name', 'twitter:description', site.description),
        tag('name', 'twitter:image', absolute(site.twitterImage)),
        tag('name', 'twitter:image:alt', 'Юлия Попова — психолог и тьютор. Онлайн и очно в Москве.'),
        `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\u003c')}</script>`,
    ].join('\n  ');
}

export function robots() {
    // Wildcard access includes search, AI retrieval and social preview crawlers.
    return `User-agent: *\nAllow: /\nDisallow: /hooks/\nDisallow: /api/\n\nSitemap: ${absolute('/sitemap.xml')}\n`;
}

export function sitemap() {
    // This is a single-page site: section anchors are not separate documents.
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`;
}

export function llmsSummary() {
    return `# ${site.name} — психолог, тьютор, профориентолог\n\n> Официальный сайт: ${site.url} Консультации для детей, подростков и взрослых онлайн и очно в Москве. Первая встреча-знакомство: 20 минут, бесплатно.\n\n## Основные разделы\n\n- [О Юлии Поповой](${site.url}#about): психолог и тьютор, комплексный подход.\n- [Подход к работе](${site.url}#approach): психологические и образовательные задачи.\n- [Стоимость](${site.url}#pricing): действующие форматы и цены в рублях.\n- [Форматы работы](${site.url}#comprehensive-approach): индивидуальные и семейные сессии, профориентация, сопровождение.\n- [Частые вопросы](${site.url}#faq): знакомство, различия психолога и тьютора, выбор формата.\n- [Запись и контакты](${site.url}#contacts): форма записи и прямые контакты.\n\n## Дополнительные материалы\n\n- [Услуги, стоимость и ответы на вопросы](${absolute('/llms-full.txt')})\n\n## Контакты\n\n- Telegram: ${site.telegram}\n- WhatsApp: ${site.whatsapp}\n- Email: ${site.email}\n- Телефон: ${site.phone}\n`;
}

export function llmsFull() {
    return `${llmsSummary()}\n## Услуги и стоимость\n\n${[sessions[0], ...services].map(service => `### ${service.title}\n\n${service.description || service.text}\n\nСтоимость: ${service.price}. Длительность: ${service.duration}.${service.features ? `\n\nЧто входит: ${service.features.join('; ')}.` : ''}`).join('\n\n')}\n\n## Вопросы и ответы\n\n${faqs.map(faq => `### ${faq.question}\n\n${faq.paragraphs.join('\n\n')}`).join('\n\n')}\n`;
}
