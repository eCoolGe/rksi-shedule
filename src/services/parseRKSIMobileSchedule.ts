import puppeteer from "puppeteer";

async function parseRKSIMobileSchedule(url: string, group: string): Promise<string[]> {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();
    let htmls: string[] = []

    // 0. Переходим на сайт
    await page.goto(url);

    // 1. Выбрать группу
    await page.select('select[name="group"]', group); //'ПОКС-31b');

    // 2. Нажать кнопку "Показать расписание"
    await page.click('input[name="stt"]');

    // 3. Получить данные расписания
    const elements = await page.$$('body > h3:nth-of-type(2) ~ *');

    //console.log(`Найдено элементов: ${elements.length}`);

    // Удаляет тег p с кнопкой "На сайт"
    elements.pop()

    for (const el of elements) {
        const html = await el.evaluate((el: Element) => el.outerHTML);
        htmls.push(html)
    }
    await browser.close();

    return htmls;
}

export default parseRKSIMobileSchedule;