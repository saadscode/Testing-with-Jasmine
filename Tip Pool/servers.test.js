describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server on submitServerInfo() with empty input', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update #serverTable on updateServerTable()', function () {
    allServers = {
      server1: { serverName: 'Alice', tipAmt: 0 },
      server2: { serverName: 'Bob', tipAmt: 0 },
      server3: { serverName: 'Charlie', tipAmt: 0 },
    };
    updateServerTable();

    let curTdList = document.querySelectorAll('#serverTable tbody tr td');

    expect(curTdList.length).toEqual(6);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
    expect(curTdList[2].innerText).toEqual('Bob');
    expect(curTdList[3].innerText).toEqual('$0.00');
    expect(curTdList[4].innerText).toEqual('Charlie');
    expect(curTdList[5].innerText).toEqual('$0.00');
  });

  afterEach(function() {
    serverId = 0;
    serverTbody.innerHTML = '';
    allServers = {};
    serverNameInput.value = '';
  });
});
