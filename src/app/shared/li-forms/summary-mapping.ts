export function mapSummaryConfig(config) {
    return {
        lan: {
            title: 'LAN configuration',
            fields: [
                {
                    label: 'IP',
                    value: config['network'].lan.ip
                },
                {
                    label: 'Netmask',
                    value: config['network'].lan.netmask
                },
                {
                    label: 'DHCP Range',
                    value: config['network'].lan.dhcp_range
                },
                {
                    label: 'SSID',
                    value: config['network'].lan.hotspot.ssid
                },
                {
                    label: 'Password',
                    value: config['network'].lan.hotspot.password
                }
            ]
        },
        wan: {
            title: 'WAN configuration',
            fields: [
                {
                    label: 'IP',
                    value: config['network'].wan.static.ip
                },
                {
                    label: 'Netmask',
                    value: config['network'].wan.static.netmask
                },
                {
                    label: 'Gateway',
                    value: config['network'].wan.static.gateway
                },
                {
                    label: 'DNS Server',
                    value: config['network'].wan.static.dns_server
                },
                {
                    label: 'SSID',
                    value: config['network'].wan.wifi.ssid
                },
                {
                    label: 'Password',
                    value: config['network'].wan.wifi.password
                }
            ]
        },
        services: {
            title: 'Services',
            fields: [
                {
                    label: 'SSH',
                    value: config['network'].ssh.enabled === true
                },
                {
                    label: 'HOOVER',
                    value: config['services'].hoover === true
                },
                {
                    label: 'HYPOTHESIS',
                    value: config['services'].hypothesis === true
                },
                {
                    label: 'DOKUWIKI',
                    value: config['services'].docuwiki === true
                },
                {
                    label: 'MATRIX',
                    value: config['services'].matrix === true
                },
                {
                    label: 'DAVROS',
                    value: config['services'].davros === true
                }
            ]
        }

    };
}