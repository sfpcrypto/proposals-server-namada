# A microservice that combines information about Proposal and outputs data in JSON format.

## My moniker - pacovit
## my pub key - tpknam1qp2t50azwqg9n4ja27s8s5tpfx8e9wyxg4a8fdrpsjjw3ceuxscx7tag8z7

## What is this and why?
 To develop web applications for the Namada blockchain, we need microservices that receive information through the CLI and output it in a form convenient for Frontend, for example in JSON.
 I have developed a server that anyone can install on their local machine if they have Namada Client installed.
 Below I will describe in what form you can receive information and attach my raised server. I will also describe instructions on how you can set up your own server.  
### Demo https://namada-proposal-api.pacovit.xyz  
All queries can return either an object or null.  

The root request  **"/"** returns general information: the current epoch and the ID of the last proposal:
```
{
"epoch": "65",
"lastProposalId": "482"
}
```

 A request made via the link **"/proposal/:id"** returns information similar to the one below (I deliberately left only 3 votes, because all the votes would not fit here) This is a request https://namada-proposal-api.pacovit.xyz/proposal/470 :
```
{
"lastCommittedEpoch": 65,
"proposalId": 470,
"type": "PGF steward",
"author": "tnam1qzapwdp5ldskua87lqd0nd2kcc7pjeljvqxt770v",
"content": {
"abstract": "OnThePluto",
"authors": "rossoman2k@gmail.com",
"created": "2024-03-27T10:00:00Z",
"details": "OnThePluto",
"discussions-to": "https://onthepluto.com",
"license": "MIT",
"motivation": "namada LOVE",
"title": "OnThePluto PgfSteward"
},
"startEpoch": 60,
"endEpoch": 62,
"graceEpoch": 64,
"status": "ended",
"data": {
"Addresses": [
"Add(tnam1qzapwdp5ldskua87lqd0nd2kcc7pjeljvqxt770v)"
]
},
"votes": [{
"voter": "tnam1qr759dcuw699ju7h9s6t93tnsj5aphp9yvxryz87",
"vote": "yay"
},
{
"voter": "tnam1qzeenzqnngaldqtj2texua4td3x8tdx9rsknvknv",
"vote": "yay"
},
{
"voter": "tnam1qqgcrx3zg4q5h8rrlkqe6au9j7scw2cxtcy8ae56",
"vote": "yay"
}],
"result": {
"result": "rejected",
"yay": "42426239.918282",
"nay": "31456010.074202",
"abstain": "6191005.675000",
"totalVotingPower": "260657934.889873",
"threshold": "86885978.296538"
}
}
```
## How to install?
>To set up such a server you need:  
- Install the latest stable version of NodeJS;  
- Clone this repository to your system;  
- Create a “.env” file in the project folder and fill it in according to the model from the “.env.example” file (if you don’t fill it in, the default values will be - port 5000, rpc of your node)  
- Enter the following commands:
```
npm i  
npm run build  
npm run start
```
- The service will be available on the port that you entered in env or on port 5000.
