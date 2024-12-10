from selenium import webdriver
from selenium.webdriver.common.by import By

from selenium.webdriver.common.action_chains import ActionChains

from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

servico = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=servico)

driver.implicitly_wait(4)
driver.get("http://localhost:3000/")
title = driver.title
driver.set_window_size(1552, 922)


driver.find_element(By.CSS_SELECTOR, ".sc-dkjKgF").click()

driver.find_element(By.NAME, "name").click()

driver.find_element(By.NAME, "name").send_keys("FATEC SJC")

driver.find_element(By.NAME, "nickname").click()

driver.find_element(By.NAME, "nickname").send_keys("Fatec")

driver.find_element(By.NAME, "mac").click()

driver.find_element(By.NAME, "mac").send_keys("asdncb23734")

driver.find_element(By.NAME, "latitude").click()

driver.find_element(By.NAME, "latitude").send_keys("-23,16236")

driver.find_element(By.NAME, "longitude").click()

driver.find_element(By.NAME, "longitude").send_keys("-45,79553")

element = driver.find_element(By.NAME, "address")
driver.execute_script("arguments[0].scrollIntoView(true);", element)
element.click()

driver.find_element(By.NAME, "address").send_keys("perto ao parque tecnologico")

driver.find_element(By.CSS_SELECTOR, ".sc-hLclGa:nth-child(2)").click()

element = driver.find_element(By.CSS_SELECTOR, ".fIsxMh")
actions = ActionChains(driver)
actions.double_click(element).perform()

driver.find_element(By.CSS_SELECTOR, ".ikGYzi:nth-child(1) > .sc-iBAaJG").click()

driver.find_element(By.CSS_SELECTOR, ".ikGYzi:nth-child(1) > .sc-iBAaJG").send_keys("2023-10-01")

driver.find_element(By.CSS_SELECTOR, ".ikGYzi:nth-child(2) > .sc-iBAaJG").click()

driver.find_element(By.CSS_SELECTOR, ".ikGYzi:nth-child(2) > .sc-iBAaJG").send_keys("2023-10-30")

driver.find_element(By.CSS_SELECTOR, ".sc-dkjKgF:nth-child(2) svg").click()

driver.find_element(By.CSS_SELECTOR, ".gdMoIq .sc-eDnVMP > svg").click()

driver.find_element(By.CSS_SELECTOR, ".kYLYk").click()

driver.find_element(By.CSS_SELECTOR, ".ewqYfZ:nth-child(2) > img").click()

driver.find_element(By.CSS_SELECTOR, ".sc-dkjKgF").click()

driver.find_element(By.NAME, "name").click()

driver.find_element(By.NAME, "name").send_keys("Pressão")

driver.find_element(By.NAME, "tipo").click()

driver.find_element(By.NAME, "tipo").send_keys("Barômetro")

driver.find_element(By.NAME, "apelido").click()

driver.find_element(By.NAME, "apelido").send_keys("pre")

driver.find_element(By.NAME, "factor").click()

driver.find_element(By.NAME, "factor").send_keys("1")

driver.find_element(By.NAME, "offset").click()

driver.find_element(By.NAME, "offset").send_keys("1")

driver.find_element(By.CSS_SELECTOR, ".sc-bcPKhP:nth-child(2) > .sc-bcPKhP > .sc-bcPKhP > .sc-bcPKhP > .sc-gKHVLF .sc-hLclGa").click()

driver.find_element(By.CSS_SELECTOR, ".ewqYfZ:nth-child(2) > img").click()

driver.find_element(By.CSS_SELECTOR, ".sc-bcPKhP:nth-child(3) > img").click()

driver.find_element(By.CSS_SELECTOR, ".sc-bcPKhP:nth-child(4) > img").click()

driver.quit()