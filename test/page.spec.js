const BaseUrl = `http://localhost:${process.env.TEST_PORT}/`

describe('Lander', () => {
  beforeAll(async () => {
    await page.goto(BaseUrl)
  })

  it('should display correct title', async () => {
    const pageTitle = await page.title()
    expect(pageTitle).toMatch('CompLeap POC')
  })

  it('should display correct text', async () => {
    await expect(page).toMatch('CompLeap POC')
  })
})
