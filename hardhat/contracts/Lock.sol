// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract CustomToken is ERC20{
    constructor(string memory name , string memory symbol) ERC20(name,symbol){
        _mint(msg.sender , 10000000 *10 ** 18);
    }
}
contract CustomDex {
    // Custom tokens to be initialiazed
    string[] public tokens = ["Tether USD" ,"BNB" , "USD Coin" , "stETH","TRON" ,"Matic Token" , "SHIBA INU", "Uniswap","AMOY" ];
    // map to maintain the tokens and its instance
    mapping(string=>ERC20) public tokenIntanceMap;
    uint256 ethValue = 100000000000000;
    ERC20 public tokenC; // RT token
    ERC20 public tokenD; // ST token
    ERC20 public tokenx; // RT token
    ERC20 public tokenz; // ST token

    struct History{
        uint256 historyID;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address userAddress;
    }
    uint256 public _historyIndex;
    mapping(uint256=>History) private historys;
    constructor(){
        for(uint i=0;i<tokens.length;i++){
            CustomToken token = new CustomToken(tokens[i],tokens[i]);
            tokenIntanceMap[tokens[i]]=token;
        }
    }
     function setToken(address _tokenC, address _tokenD) public {
        tokenC = ERC20(_tokenC);
        tokenD = ERC20(_tokenD);
    }

    function returnBalanceOfC() public view returns (uint256) {
        return tokenC.balanceOf(address(this));
    }

    function returnBalanceOfD() public view returns (uint256) {
        return tokenD.balanceOf(address(this));
    }
    function swapTokens(uint256 amount, uint256 conversationAmount) public {
        amount = amount * (10**18);

        bool C = tokenC.approve(address(this), amount);
        require(C, "Approval failed");
//  require(token1.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance for token1");

        bool A = tokenC.transferFrom(msg.sender, address(this), amount);
        require(A, "Failed from A to Contract");

        amount = amount * conversationAmount;

        bool B = tokenD.transfer(msg.sender, amount);
        require(B, "Failed from A to Contract");
    }
    function getBalance (string memory tokenName , address _address) public view returns(uint256){
        return tokenIntanceMap[tokenName].balanceOf(_address);
    }
    function getTotalSupply(string memory tokenName) public view returns(uint256){
        return tokenIntanceMap[tokenName].totalSupply();
    }
    function getName(string memory tokenName) public view returns(string memory){
        return tokenIntanceMap[tokenName].name();
    }
    function getTokenAddress(string memory tokenName) public view returns(address){
        return address(tokenIntanceMap[tokenName]);
    }
    function getEthBalance() public view returns(uint256){
        return address(this).balance;
    }
    function getContractBalance(address contractaddr) public view returns (uint256) {
        return address(contractaddr).balance;
    }
    function _transactionHistory(string memory tokenName , string memory etherToken , uint256 inputValue , uint256 outputValue ) internal {
        _historyIndex++;
        uint256 historyId = _historyIndex;
        History storage history = historys[historyId];
        history.historyID = historyId;
        history.userAddress = msg.sender;
        history.tokenA = tokenName;
        history.tokenB = etherToken;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
    }
    function swapEthToToken(string memory tokenName) public payable returns(uint256){
        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue/ethValue) * 10 ** 18;
        require(tokenIntanceMap[tokenName].transfer(msg.sender , outputValue));
        string memory etherValue = "Ehter";
        _transactionHistory(tokenName , etherValue , inputValue , outputValue);
        return outputValue;
    }
    function swapTokenToEth(string memory tokenName , uint256 _amount)public returns(uint256){
        // convert token amounts to actual amount
        uint256 exactAmount = _amount / 10**18;
        uint256 ethToBeTransfer = exactAmount * ethValue;
        require(address(this).balance >= ethToBeTransfer , "Dex is running low on balance");
        payable(msg.sender).transfer(ethToBeTransfer);
        require(tokenIntanceMap[tokenName].transferFrom(msg.sender , address(this) , _amount));
        string memory etherValue = "Ether";
        _transactionHistory(tokenName , etherValue , exactAmount , ethToBeTransfer);
        return ethToBeTransfer;
    }
    function swapTokenToToken(string memory srcToken , string memory desToken , uint256 _amount) public{
        require(tokenIntanceMap[srcToken].transferFrom(msg.sender , address(this) , _amount));
        require(tokenIntanceMap[desToken].transfer(msg.sender , _amount));
        _transactionHistory(srcToken , desToken , _amount , _amount);
    }
    function getAllHistory() public view returns(History[] memory){
        uint256 itemCount = _historyIndex;
        uint256 currentIdx = 0;
        History[] memory items = new History[](itemCount);
        for(uint256 i=0;i<itemCount;i++){
            uint256 currentId = i+1;
            History storage currItem = historys[currentId];
            items[currentIdx] = currItem;
            currentIdx+=1;
        }
        return items;
    }

    function passtoken(
        address _tokenx,
        address _tokenz,
        uint256 amount
     ) public {
        tokenx = ERC20(_tokenx);
        tokenz = ERC20(_tokenz);
        
        amount = amount * (10**18);

        bool C = tokenx.approve(address(this), amount);
        require(C, "Approval failed");

        bool A = tokenx.transferFrom(msg.sender, address(this), amount);
        require(A, "Failed from A to Contract");
    }

    function transfertoken(
        address _tokenx,
        address _tokenz,
        uint256 amount
     ) public {
        tokenx = ERC20(_tokenx);
        tokenz = ERC20(_tokenz);
        
        amount = amount * (10**18);

        bool C = tokenx.approve(address(this), amount);
        require(C, "Approval failed");

        bool A = tokenx.transferFrom(msg.sender, address(this), amount);
        require(A, "Failed from A to Contract");

        
        bool B = tokenz.transfer(msg.sender, amount);
        require(B, "Failed from A to Contract");
    }
  
}