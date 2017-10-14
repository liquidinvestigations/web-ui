export function mapSummaryConfig(config) {
    let mapping = {};

    if (config.lan) {
        mapping['lan'] = {
            title: 'LAN configuration',
            fields: [
                {
                    label: 'IP',
                    value: config.lan.ip
                },
                {
                    label: 'Netmask',
                    value: config.lan.netmask
                },
                {
                    label: 'DHCP Range',
                    value: config.lan.dhcp_range
                },
                {
                    label: 'SSID',
                    value: config.lan.hotspot.ssid
                },
                {
                    label: 'Password',
                    value: config.lan.hotspot.password
                }
            ]
        };
    }

    if (config.wan) {
        mapping['wan'] = {
            title: 'WAN configuration',
            fields: [
                {
                    label: 'SSID',
                    value: config.wan.wifi.ssid
                },
                {
                    label: 'Password',
                    value: config.wan.wifi.password
                }
            ]
        };

        if (config.wan.static) {
            mapping['wan'].fields.concat([
                {
                    label: 'IP',
                    value: config.wan.static.ip
                },
                {
                    label: 'Netmask',
                    value: config.wan.static.netmask
                },
                {
                    label: 'Gateway',
                    value: config.wan.static.gateway
                },
                {
                    label: 'DNS Server',
                    value: config.wan.static.dns_server
                }
            ]);
        }
    }

    if (config.services) {
        mapping['services'] = {
            title: 'Services',
            fields: [
                {
                    label: 'SSH',
                    value: config.ssh.enabled === true
                },
                {
                    label: 'HOOVER',
                    value: config.services.hoover === true
                },
                {
                    label: 'HYPOTHESIS',
                    value: config.services.hypothesis === true
                },
                {
                    label: 'DOKUWIKI',
                    value: config.services.docuwiki === true
                },
                {
                    label: 'MATRIX',
                    value: config.services.matrix === true
                },
                {
                    label: 'DAVROS',
                    value: config.services.davros === true
                }
            ]
        };
    }

    return mapping;
}
