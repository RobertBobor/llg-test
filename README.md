
# LLG web3 integration

New API endpoint enabling calling any read or write function on LLG smart contract.




## API Reference

#### Call smart contract function

```http
  POST /blockchain
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `method` | `string` | **Required**. Name of the function |
| `params` | `list` | **Required**. List of arguments passed to the function |
| `isWrite` | `bool` | **Required**. Whether the function is read or write |




## Run Locally

Clone the project

```bash
  git clone https://github.com/RobertBobor/llg-test
```

Go to the project directory

```bash
  cd llg-test
```

Install dependencies

```bash
  npm install web3
```

Start the server

```bash
  node app.js
```


## Running Tests

Prepare testing environment (assuming venv and pip is installed)
```bash
  python3 -m venv llg
  source llg/bin/activate
  pip3 install requests
```

To run tests of few read functions, run the following command

```bash
  python3 test.py
```

