// This sample code supports WebdriverIO client >=9.7.0
// (npm i --save webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const {remote} = require ('webdriverio')
const assert = require ('assert')


async function main () {
  const caps = {
  "platformName": "Android",
  "appium:platformVersion": "13.0",
  "appium:deviceName": "emulator5554",
  "appium:deviceOrientation": "portrait",
  "appium:appPackage": "com.saucelabs.mydemoapp.android",
  "appium:appActivity": "com.saucelabs.mydemoapp.android.view.activities.SplashActivity",
  "appium:automationName": "UiAutomator2",
  "browserName": "",
  "appium:ensureWebviewsHavePages": true,
  "appium:nativeWebScreenshot": true,
  "appium:newCommandTimeout": 3600,
  "appium:connectHardwareKeyboard": true,
  "webSocketUrl": true,
  "unhandledPromptBehavior": "ignore"
}
  const driver = await remote({
    protocol: "http",
    hostname: "127.0.0.1", // https://oauth-calvesilva.nascimento-d0f91:4d3e4f55-7a0d-4aba-9588-78a57653735b@ondemand.us-west-1.saucelabs.com:443/wd/hub
    port: 4723,
    path: "/",
    capabilities: caps
  });

  // Products
  const lbl_titulo_secao = await driver.$("accessibility id:title")
  let resultado_atual = await lbl_titulo_secao.getText() // Pega o texto do elemento
  await assert.strictEqual(resultado_atual, "Products")

  // Clicar na Mochila
  const lbl_clicar_mochila = await driver.$("-android uiautomator:new UiSelector().resourceId(\"com.saucelabs.mydemoapp.android:id/productIV\").instance(0)")
  await lbl_clicar_mochila.click()

  // Nome do produto
   const lbl_nome_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV")
   resultado_atual = await lbl_nome_produto.getText() // Pega o texto do elemento
   await assert.strictEqual(resultado_atual, "Sauce Labs Backpack")

  // Preço do produto
  const lbl_preco_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV")
  resultado_atual = await lbl_preco_produto.getText() // comparar o preço ex: linha 36
  await assert.strictEqual(resultado_atual, "$ 29.99")

  // Arrasta para cima
  await driver.action('pointer')
    .move({ duration: 0, x: 487, y: 1716 })
    .down({ button: 0 })
    .move({ duration: 1000, x: 504, y: 940 })
    .up({ button: 0 })
    .perform();

  // Adicionar no carrinho  
  const lbl_botao_Adicionar_Carrinho = await driver.$("accessibility id:Tap to add product to cart");
  await lbl_botao_Adicionar_Carrinho.click() // ok

  // Quantidade no carrinho
  const lbl_verificar_Qnt_Carrinho = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartTV");
  resultado_atual = await lbl_verificar_Qnt_Carrinho.getText() // comparar
  await assert.strictEqual(resultado_atual, "1")

  // Ir para o carrinho
  const lbl_Clicar_Carrinho = await driver.$("id:com.saucelabs.mydemoapp.android:id/cartIV");
  await lbl_Clicar_Carrinho.click() // ok

  // Cart
  const lbl_Meu_Carrinho= await driver.$("id:com.saucelabs.mydemoapp.android:id/productTV");
  resultado_atual = await lbl_Meu_Carrinho.getText() // verificar a My Cart
  await assert.strictEqual(resultado_atual, "My Cart")

  // Nome do produto
  const lbl_produto = await driver.$("id:com.saucelabs.mydemoapp.android:id/titleTV");
  resultado_atual = await lbl_produto.getText() // verificar ex: linha 36
  await assert.strictEqual(resultado_atual, "Sauce Labs Backpack")

  // Preço
  const Checar_preco = await driver.$("id:com.saucelabs.mydemoapp.android:id/priceTV");
  resultado_atual = await Checar_preco.getText() // verificar ex: linha 36
  await assert.strictEqual(resultado_atual, "$ 29.99")

  // Quantidade
  const Checar_Qnt = await driver.$("id:com.saucelabs.mydemoapp.android:id/noTV");
  resultado_atual = await Checar_Qnt.getText() // verificar ex: linha 36
  await assert.strictEqual(resultado_atual, "1")

  // Termina - Apaga a sessão
  await driver.deleteSession();
}
 
main().catch(console.log);