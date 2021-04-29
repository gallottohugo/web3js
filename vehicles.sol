pragma solidity 0.8.0;

contract Vehicles {
	address owner;
	uint256[] private ids;
	mapping (address => Vehicle) private vehicles;

	struct Vehicle {
		uint256 id;
		string brand;
		uint32 horses;
		uint32 kilometers;
	}
	uint256 price;

	modifier filterPrice(uint256 _price) {
		require(_price == price, "Wrong price!");
		_;
	}

	constructor() {
		owner = msg.sender;
	}

	function addVehicle( uint256 _id, string memory _brand, uint32 _horses, uint32 _kilometers) public filterPrice(msg.value) payable {
		ids.push(_id);
		vehicles[msg.sender].id = _id;
		vehicles[msg.sender].brand = _brand;
		vehicles[msg.sender].horses = _horses;
		vehicles[msg.sender].kilometers = _kilometers;
	}

	function getIds() external view returns(uint256 numVehicles){
		numVehicles = ids.length;
	}


	function getVehicle() external view returns(string memory brand, uint32 horses, uint32 kilometers){
		brand = vehicles[msg.sender].brand;
		horses = vehicles[msg.sender].horses;
		kilometers = vehicles[msg.sender].kilometers;
	}

}