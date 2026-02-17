# Introduction
Welcome to your notes! Please use the sidebar to navigate through the notes. This is a feature that allows you to read your markdown notes directly in the flashcard app.

# 1. Traditional IT Infrastructure
## How websites work
Simplified explanation: We have a server hosted somewhere and we, as a web browser, wants to get access to the server to visualize a website. 

The client (us) will use a network between ourselves and the server. The client will find the network and will use the network to route the packets, the data into the server.

Then, the server will then reply to us allowing us to view the website.

## How do clients find the server and vice-versa?

They both require an IP address. An IP address is a unique identifier for a device on a network. 
(i.e You (client) sending letter to a house address / consider the post-office as a network / address you put will be routed to the destination (server))

## What is a server composed of?
A server contains a CPU, memory (RAM), storage, and network interface.

* Computational Brain: CPU and RAM
* Data Storage: (Long-term) Database, (Short-term) Files
* Networking: Routers, switch, DNS server

## IT Terminology

* **Network**: cables, routers and servers connected with each other
* **Client**: A device that requests data or services from a server. (e.g., your laptop, smartphone)
* **Server**: A computer or system that provides data or services to clients. (e.g., web server, database server)
* **IP Address (Internet Protocol Address)**: A unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. (e.g., `192.168.1.1`)
* **DNS (Domain Name System)**: A hierarchical and decentralized naming system for computers, services, or any resource connected to the Internet or a private network. It translates human-readable domain names (like `google.com`) into machine-readable IP addresses.
* **Packet**: A small unit of data that is transmitted over a network. Packets are routed independently through the network and reassembled at the destination.
* **Router**: A networking device that forwards data packets between computer networks. Routers perform the traffic directing functions on the Internet.
* **Switch**: A networking device that connects multiple devices on a local area network (LAN) and forwards data packets to the intended recipient.
* **CPU (Central Processing Unit)**: The "brain" of the computer that performs most of the processing inside the computer.
* **RAM (Random Access Memory)**: Volatile memory that stores data and instructions that the CPU is currently using. It is much faster than storage but loses its contents when the power is turned off.
* **Storage**: Non-volatile memory that stores data permanently, even when the power is turned off. Examples include hard drives (HDDs), solid-state drives (SSDs), and databases.
* **Database**: An organized collection of structured information, or data, typically stored electronically in a computer system. Databases are used to store, manage, and retrieve data efficiently.
* **Files**: Unstructured or semi-structured collections of data stored on a computer system. Files can be of any type, such as text documents, images, videos, or program files.

## Flow of Client <--> Server

1. Client will send the data to a router
2. The router will find its way all the way to a switch
3. The switch will know to which computer in your network to send the data to
4. The server will receive the data and process it
5. The server will send a response back to the client
6. The client will receive the response and display it to the user

## Traditional IT Issues
* Pay for the rent for the data center
* Pay for power supply, cooling, and maintenance
* Adding and replacing hardware takes time
* Scaling is limited
* Hire 24/7 team to monitor the infrastructure
* How to deal with diasters? (earthquake, power shutdown, fire...)

How to externalize all this? --> Cloud

# 2. Cloud Computing