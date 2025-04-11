(function() {
  const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  function validateIp(ip) {
    return ipRegex.test(ip);
  }
  function getSubnetDetails(octets) {
    let ipClass, cidr, subnetMask, networkAddress;
    if (octets[0] >= 1 && octets[0] <= 126) {
      ipClass = "A";
      cidr = 8;
      subnetMask = "255.0.0.0";
      networkAddress = `${octets[0]}.0.0.0`;
    } else if (octets[0] >= 128 && octets[0] <= 191) {
      ipClass = "B";
      cidr = 16;
      subnetMask = "255.255.0.0";
      networkAddress = `${octets[0]}.${octets[1]}.0.0`;
    } else if (octets[0] >= 192 && octets[0] <= 223) {
      ipClass = "C";
      cidr = 24;
      subnetMask = "255.255.255.0";
      networkAddress = `${octets[0]}.${octets[1]}.${octets[2]}.0`;
    } else {
      return null; // Invalid class
    }
    return { networkAddress, ipClass, cidr, subnetMask };
  }
  document.getElementById("input-ip").addEventListener("input", function() {
    const ip = this.value.trim();
    const output = document.getElementById("output-subnet");
    if (!validateIp(ip)) {
      output.value = "Invalid IP address";
      return;
    }
    const octets = ip.split('.').map(Number);
    const subnetDetails = getSubnetDetails(octets);
    if (!subnetDetails) {
      output.value = "IP address is not in class A, B, or C.";
      return;
    }
    output.value =
      `Network Address: ${subnetDetails.networkAddress}\n` +
      `Class: ${subnetDetails.ipClass}\n` +
      `CIDR: /${subnetDetails.cidr}\n` +
      `Subnet Mask: ${subnetDetails.subnetMask}`;
  });
})();
