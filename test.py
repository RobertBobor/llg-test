import requests


res = requests.post('http://localhost:8000/blockchain',
                    json={
                        "method": "balanceOf",
                        "params": ["0x4691F60c894d3f16047824004420542E4674E621"],
                        "isWrite": False
                    })
print(res.status_code, res.text)

res = requests.post('http://localhost:8000/blockchain',
                    json={
                        "method": "isSwapEnabled",
                        "params": [],
                        "isWrite": False
                    })
print(res.status_code, res.text)

res = requests.post('http://localhost:8000/blockchain',
                    json={
                        "method": "lastBurnDate",
                        "params": [],
                        "isWrite": False
                    })
print(res.status_code, res.text)
