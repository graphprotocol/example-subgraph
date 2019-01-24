pragma solidity >0.4.0;

contract Counter {
  event Incremented(uint256);

  uint256 public value;

  constructor() public {
    value = 0;
  }

  function increment() public payable {
    value += 1;
    emit Incremented(value);
  }
}