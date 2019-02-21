const BaseUrl = `http://localhost:${process.env.TEST_PORT}/`

describe('Lander', () => {
  beforeAll(async () => {
    await page.goto(BaseUrl)
  })

  it('should display correct title', async () => {
    const pageTitle = await page.title()
    expect(pageTitle).toMatch('CompLeap')
  })

  it('should display correct heading', async () => {
    await expect(page).toMatchElement('h1', { text: 'CompLeap' })
  })
})
