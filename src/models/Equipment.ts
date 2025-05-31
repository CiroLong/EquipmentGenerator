// 装备品质类型定义
export type Quality = 'darkstar' | 'legendary' | 'epic' | 'rare';

// 装备状态类型定义
export type EquipmentState = 'normal' | 'cursed' | 'corrupted';

// 主属性类型定义
export type AttributeType = '力量' | '体质' | '灵巧' | '感知' | '魔力' | '意志';

// 高级属性类型定义
export type AdvancedAttributeType = '速度' | '运气';

/**
 * 基础附魔词条接口
 */
export interface BaseEnchantment {
    type: string;
    name: string;
    value: number;
    display: string;
    category: string;
    upgradeable?: boolean; // 是否可改造
}

/**
 * 属性类型附魔词条接口
 */
export interface AttributeEnchantment extends BaseEnchantment {
    type: 'attribute';
    name: AttributeType | AdvancedAttributeType;
    isAdvanced: boolean;
}

/**
 * 技能类型附魔词条接口
 */
export interface SkillEnchantment extends BaseEnchantment {
    type: 'skill';
    belongsTo: AttributeType;
}

/**
 * 特殊类型附魔词条接口
 */
export interface SpecialEnchantment extends BaseEnchantment {
    type: 'special';
    spell?: string;
}

/**
 * 负面附魔词条接口
 */
export interface NegativeEnchantment extends BaseEnchantment {
    type: 'negative';
    name: string;
    value: number;
    display: string;
    category: '负面词条';
}

export type Enchantment = AttributeEnchantment | SkillEnchantment | SpecialEnchantment | NegativeEnchantment;

/**
 * 装备接口
 */
export interface Equipment {
    id: number;
    name: string;
    adjective: string;
    noun: string;
    quality: Quality;
    state: EquipmentState;
    level: number;
    enchantments: Enchantment[];
    enchantmentCapacity: number; // 总容量上限
    usedCapacity: number; // 已使用的容量
    timestamp: string;
}

/**
 * 特殊附魔词条模板接口
 */
export interface SpecialEnchantmentTemplate {
    type: string;
    name: string;
    min: number;
    max: number;
    display: (n: number) => string;
    category: string;
    spell?: string;
}

/**
 * 技能属性映射接口
 */
export interface SkillsByAttribute {
    [key: string]: string[];
}

// 词库数据
export const EQUIPMENT_DATA = {
    adjectives: [
        '黑星', '传说', '史诗', '稀有',
        '神圣', '黑暗', '火焰', '冰霜', '雷电',
        '光明', '暗影', '血腥', '锋利', '坚固',
        '魔法', '远古', '禁忌', '神秘', '强化',
        '破损', '生锈', '闪耀', '诅咒', '祝福',
        '龙鳞', '凤羽', '星辰', '月影', '日炎',
        '风暴', '大地', '海洋', '天空', '地狱',
        '天堂', '虚空', '混沌', '秩序', '永恒'
    ],
    mainAttributes: ['力量', '体质', '灵巧', '感知', '魔力', '意志'] as AttributeType[],
    advancedAttributes: ['速度', '运气'] as AdvancedAttributeType[],
    nouns: [
        '长剑', '短剑', '巨剑', '匕首', '法杖',
        '盾牌', '战锤', '长弓', '弩箭', '法球',
        '头盔', '胸甲', '护腿', '战靴', '手套',
        '项链', '戒指', '耳环', '腰带', '护符',
        '斗篷', '长袍', '皮甲', '锁甲', '板甲',
        '战斧', '长枪', '三叉戟', '魔杖', '水晶球',
        '护腕', '肩甲', '面具', '王冠', '权杖'
    ],
    skillsByAttribute: {
        '力量': ['长剑专精', '斧专精', '格斗技巧', '镰刀专精', '双手武器', '战术', '举重', '铁匠', '栽培'],
        '体质': ['杖专精', '长杆专精', '钝器专精', '盾专精', '中装备', '重装备', '木匠', '采掘', '治愈'],
        '灵巧': ['短剑专精', '二刀流', '弓专精', '弩专精', '投掷技巧', '轻装备', '精通闪避', '搜索', '宝石加工', '裁缝', '开锁', '解除陷阱'],
        '感知': ['枪械专精', '远程武器专精', '心眼', '自然学识', '潜行', '垂钓', '鉴定', '侦查', '演奏', '元素精灵强化'],
        '魔力': ['魔法修行', '元素引导', '暗影术', '结界术', '仪式', '炼金术', '烹饪', '解剖学', '读书', '基因学'],
        '意志': ['恢复术', '祝福术', '招魂术', '精神控制', '默记', '魔力极限', '交涉', '赞助', '冥想', '骑乘', '旅行', '信仰']
    } as SkillsByAttribute,
    // 负面词条数据
    negativeEnchantments: [
        {
            name: '中断成长',
            display: '中断你的成长'
        },
        {
            name: '召唤魔物',
            display: '随机召唤魔物'
        },
        {
            name: '随机传送',
            display: '引起随机的瞬间移动'
        },
        {
            name: '生命吸收',
            display: '吸收使用者的血'
        }
    ],
    // 装备状态前缀
    statePrefix: {
        cursed: '诅咒的',
        corrupted: '堕落的'
    }
} as const;

/**
 * 附魔词条的容量消耗配置
 */
const ENCHANTMENT_CAPACITY_COSTS = {
    // 属性词条（主属性和高级属性）每点消耗50容量
    attribute: {
        costPerPoint: 50
    },
    // 技能词条每点消耗50容量
    skill: {
        costPerPoint: 50
    },
    // 特殊词条的容量消耗配置
    special: {
        // 暴击每1%消耗50容量
        crit: {
            costPerPoint: 50
        },
        // 武器特效每1点强度消耗1容量
        weapon_effect: {
            costPerPoint: 1
        },
        // 减伤每1%消耗40容量
        reduce_physical: {
            costPerPoint: 40
        },
        reduce_magic: {
            costPerPoint: 40
        },
        // 免疫固定消耗50容量
        immune: {
            fixedCost: 50
        },
        // 格挡率每1%消耗40容量
        block: {
            costPerPoint: 40
        }
    }
};

// 装备生成器类
export class EquipmentGenerator {
    private specialEnchantments: SpecialEnchantmentTemplate[];

    constructor() {
        this.specialEnchantments = this.initializeSpecialEnchantments();
    }

    /**
     * 初始化特殊附魔词条池，包括基础特效和武器法术
     * @returns 特殊附魔词条模板数组
     */
    private initializeSpecialEnchantments(): SpecialEnchantmentTemplate[] {
        const baseEnchantments = [
            {
                type: 'crit',
                name: '暴击',
                min: 1,
                max: 20,
                display: (n: number) => `暴击+${n}%`,
                category: '特殊词条'
            },
            {
                type: 'block',
                name: '格挡率',
                min: 1,
                max: 30,
                display: (n: number) => `格挡率+${n}%`,
                category: '特殊词条'
            },
            {
                type: 'reduce_physical',
                name: '承受的物理伤害减少',
                min: 1,
                max: 50,
                display: (n: number) => `承受的物理伤害减少${n}%`,
                category: '特殊词条'
            },
            {
                type: 'reduce_magic',
                name: '承受的魔法伤害减少',
                min: 1,
                max: 50,
                display: (n: number) => `承受的魔法伤害减少${n}%`,
                category: '特殊词条'
            },
            {
                type: 'immune',
                name: '小几率免疫伤害',
                min: 1,
                max: 1800,
                display: (n: number) => `小几率免疫伤害[${n}]`,
                category: '特殊词条'
            }
        ];

        const spells = [
            // 射线类
            '聚魔射线', '炽热射线', '冰冻射线', '雷光射线', '幻影射线', '地狱射线', '暗黑射线',
            // 范围类
            '轰鸣波动', '手榴弹',
            // 吐息类
            '电击吐息', '神经吐息', '地狱吐息',
            // 状态类
            '元素伤痕', '梦魇', '沉默', '璐璐薇附体', '智者的加护', '振奋', '加速', '再生', '神圣之盾', '圣光加护',
            // 特殊类
            '影步', '空间扭曲', '异次元之手', '斩′首', '荆棘缠绕', '治愈之雨', '蛛网术'
        ].map(spell => ({
            type: 'weapon_effect',
            name: `武器特效：${spell}`,
            min: 1,
            max: 1000,
            display: (n: number) => `武器特效：${spell}[${n}]`,
            category: '特殊词条',
            spell
        }));

        return [...baseEnchantments, ...spells];
    }

    /**
     * 计算装备的附魔容量
     * @param quality 装备品质
     * @param level 装备等级
     * @returns 附魔容量数值
     */
    private calculateEnchantmentCapacity(quality: Quality, level: number): number {
        switch (quality) {
            case 'darkstar':
                return 2000 + Math.floor(1.5 * level);
            case 'legendary':
                return 2000 + Math.floor(Math.random() * 1001); // 2000-3000
            case 'epic':
                return 1500 + Math.floor(Math.random() * 1001); // 1500-2500
            case 'rare':
                return 1000 + Math.floor(Math.random() * 1001); // 1000-2000
            default:
                return 1000;
        }
    }

    /**
     * 根据形容词或随机概率确定装备品质
     * @param adjective 装备形容词
     * @returns 装备品质
     */
    private getQuality(adjective: string): Quality {
        if (adjective === '黑星') return 'darkstar';
        if (adjective === '传说') return 'legendary';
        if (adjective === '史诗') return 'epic';
        if (adjective === '稀有') return 'rare';

        const rand = Math.random();
        if (rand < 0.05) return 'darkstar';     // 5%概率黑星
        else if (rand < 0.15) return 'legendary'; // 10%概率传说
        else if (rand < 0.35) return 'epic';     // 20%概率史诗
        else return 'rare';                      // 65%概率稀有
    }

    /**
     * 生成单个附魔词条
     * @returns 随机生成的附魔词条
     */
    private generateEnchantment(): Enchantment {
        const rand = Math.random();
        if (rand < 0.2) {
            const isWeaponSpell = Math.random() < 0.4;

            let special: SpecialEnchantmentTemplate;
            if (isWeaponSpell) {
                const weaponSpells = this.specialEnchantments.slice(5);
                special = weaponSpells[Math.floor(Math.random() * weaponSpells.length)];
            } else {
                const basicEffects = this.specialEnchantments.slice(0, 5);
                special = basicEffects[Math.floor(Math.random() * basicEffects.length)];
            }

            const value = Math.floor(Math.random() * (special.max - special.min + 1)) + special.min;
            return {
                type: 'special',
                name: special.name + (special.spell ? `(${special.spell})` : ''),
                value,
                display: special.display(value),
                category: special.category,
                spell: special.spell
            };
        } else if (rand < 0.5) {
            const isAdvanced = Math.random() < 0.1;
            const attributePool = isAdvanced ? EQUIPMENT_DATA.advancedAttributes : EQUIPMENT_DATA.mainAttributes;
            const attribute = attributePool[Math.floor(Math.random() * attributePool.length)];
            const level = Math.floor(Math.random() * 20) + 1;

            return {
                type: 'attribute',
                name: attribute,
                value: level,
                isAdvanced,
                display: `${attribute}+${level}`,
                category: '属性词条'
            };
        } else {
            const attributeKeys = Object.keys(EQUIPMENT_DATA.skillsByAttribute) as AttributeType[];
            const randomAttribute = attributeKeys[Math.floor(Math.random() * attributeKeys.length)];
            const skillsInCategory = EQUIPMENT_DATA.skillsByAttribute[randomAttribute];
            const skill = skillsInCategory[Math.floor(Math.random() * skillsInCategory.length)];
            const level = Math.floor(Math.random() * 20) + 1;

            return {
                type: 'skill',
                name: skill,
                value: level,
                belongsTo: randomAttribute,
                display: `${skill}+${level}`,
                category: '技能词条'
            };
        }
    }

    /**
     * 计算单个附魔词条的容量消耗
     * @param enchantment 附魔词条
     * @returns 容量消耗值
     */
    private calculateEnchantmentCost(enchantment: Enchantment): number {
        switch (enchantment.type) {
            case 'attribute':
                return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.attribute.costPerPoint;
            case 'skill':
                return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.skill.costPerPoint;
            case 'special':
                if (enchantment.name.startsWith('武器特效：')) {
                    return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.special.weapon_effect.costPerPoint;
                }
                switch (true) {
                    case enchantment.name.includes('暴击'):
                        return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.special.crit.costPerPoint;
                    case enchantment.name.includes('物理伤害减少'):
                        return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.special.reduce_physical.costPerPoint;
                    case enchantment.name.includes('魔法伤害减少'):
                        return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.special.reduce_magic.costPerPoint;
                    case enchantment.name.includes('免疫伤害'):
                        return ENCHANTMENT_CAPACITY_COSTS.special.immune.fixedCost;
                    case enchantment.name.includes('格挡率'):
                        return enchantment.value * ENCHANTMENT_CAPACITY_COSTS.special.block.costPerPoint;
                    default:
                        return 0;
                }
            default:
                return 0;
        }
    }

    /**
     * 生成负面词条
     * @returns 生成的负面词条
     */
    private generateNegativeEnchantment(): NegativeEnchantment {
        const template = EQUIPMENT_DATA.negativeEnchantments[
            Math.floor(Math.random() * EQUIPMENT_DATA.negativeEnchantments.length)
        ];

        return {
            type: 'negative',
            name: template.name,
            value: 0,
            display: template.display,
            category: '负面词条'
        };
    }

    /**
     * 根据装备品质生成附魔词条列表
     * @param quality 装备品质
     * @param totalCapacity 总附魔容量
     * @param state 装备状态
     * @returns 附魔词条数组
     */
    private generateEnchantments(quality: Quality, totalCapacity: number, state: EquipmentState): Enchantment[] {
        let remainingCapacity = totalCapacity;
        const enchantments: Enchantment[] = [];
        const usedNames = new Set<string>();

        // 如果是诅咒或堕落装备，有50%概率添加负面词条
        if (state !== 'normal' && Math.random() < 0.5) {
            const negativeEnchantment = this.generateNegativeEnchantment();
            enchantments.push(negativeEnchantment);
            remainingCapacity += 500; // 负面词条增加可用容量
        }

        // 根据品质和状态调整词条生成
        const getAdjustedValue = (min: number, max: number): number => {
            if (state !== 'normal') {
                // 诅咒/堕落装备更容易出现极端值
                const rand = Math.random();
                if (rand < 0.4) {
                    return Math.floor(max * 0.9 + Math.random() * (max * 0.1)); // 接近最大值
                } else if (rand < 0.7) {
                    return Math.floor(min + Math.random() * (min * 0.2)); // 接近最小值
                }
            }
            return Math.floor(min + Math.random() * (max - min + 1));
        };

        // 黑星品质的特殊生成规则
        if (quality === 'darkstar') {
            // 尝试生成高级属性词条
            const advancedAttribute = EQUIPMENT_DATA.advancedAttributes[
                Math.floor(Math.random() * EQUIPMENT_DATA.advancedAttributes.length)
            ];
            const maxAdvancedValue = Math.min(20, Math.floor(remainingCapacity / ENCHANTMENT_CAPACITY_COSTS.attribute.costPerPoint));
            if (maxAdvancedValue >= 1) {
                const minValue = 11;
                const advancedValue = getAdjustedValue(minValue, maxAdvancedValue);
                const advancedEnchantment: AttributeEnchantment = {
                    type: 'attribute',
                    name: advancedAttribute,
                    value: advancedValue,
                    isAdvanced: true,
                    display: `${advancedAttribute}+${advancedValue}`,
                    category: '属性词条'
                };
                enchantments.push(advancedEnchantment);
                remainingCapacity -= this.calculateEnchantmentCost(advancedEnchantment);
                usedNames.add(advancedAttribute);
            }
        }

        // 继续生成其他词条
        const targetCount = quality === 'darkstar' ? 5 :
            quality === 'legendary' ? (Math.random() < 0.5 ? 2 : 5) :
                quality === 'epic' ? (Math.random() < 0.5 ? 2 : 3) :
                    Math.random() < 0.7 ? 1 : 2;

        while (enchantments.length < targetCount && remainingCapacity > 0) {
            const enchantment = this.tryGenerateEnchantmentWithinCapacity(remainingCapacity, usedNames, getAdjustedValue);
            if (enchantment) {
                enchantments.push(enchantment);
                usedNames.add(enchantment.name);
                remainingCapacity -= this.calculateEnchantmentCost(enchantment);
            } else {
                break;
            }
        }

        // 为随机词条添加可改造标识
        const maxUpgradeable = quality === 'darkstar' || quality === 'legendary' ?
            1 + Math.floor(Math.random() * 2) : // 1-2个
            Math.floor(Math.random() * 3); // 0-2个

        if (enchantments.length > 0 && maxUpgradeable > 0) {
            const indices = new Set<number>();
            while (indices.size < Math.min(maxUpgradeable, enchantments.length)) {
                indices.add(Math.floor(Math.random() * enchantments.length));
            }

            indices.forEach(index => {
                if (enchantments[index].type !== 'negative') { // 负面词条不能被改造
                    enchantments[index].upgradeable = true;
                }
            });
        }

        return enchantments;
    }

    /**
     * 尝试生成一个不超过剩余容量的附魔词条
     * @param remainingCapacity 剩余容量
     * @param excludeNames 已使用的词条名称
     * @param getAdjustedValue 获取调整后的值的函数
     * @returns 生成的附魔词条，如果无法生成则返回null
     */
    private tryGenerateEnchantmentWithinCapacity(
        remainingCapacity: number,
        excludeNames: Set<string>,
        getAdjustedValue: (min: number, max: number) => number
    ): Enchantment | null {
        let attempts = 0;
        const maxAttempts = 20;

        while (attempts < maxAttempts) {
            const enchantment = this.generateEnchantment();
            if (excludeNames.has(enchantment.name)) {
                attempts++;
                continue;
            }

            const cost = this.calculateEnchantmentCost(enchantment);
            if (cost <= remainingCapacity) {
                // 调整词条数值
                if (enchantment.type === 'attribute' || enchantment.type === 'skill') {
                    const maxPossibleValue = Math.floor(remainingCapacity / ENCHANTMENT_CAPACITY_COSTS.attribute.costPerPoint);
                    enchantment.value = getAdjustedValue(1, maxPossibleValue);
                    enchantment.display = `${enchantment.name}+${enchantment.value}`;
                }
                return enchantment;
            }

            attempts++;
        }

        return null;
    }

    /**
     * 生成一件完整的装备
     * @returns 生成的装备对象
     */
    public generateEquipment(): Equipment {
        const randomAdjective = EQUIPMENT_DATA.adjectives[Math.floor(Math.random() * EQUIPMENT_DATA.adjectives.length)];
        const randomNoun = EQUIPMENT_DATA.nouns[Math.floor(Math.random() * EQUIPMENT_DATA.nouns.length)];
        const level = Math.floor(Math.random() * 3499) + 1;
        const quality = this.getQuality(randomAdjective);

        // 10%概率生成诅咒或堕落装备
        const state: EquipmentState = Math.random() < 0.1 ?
            (Math.random() < 0.5 ? 'cursed' : 'corrupted') :
            'normal';

        const totalCapacity = this.calculateEnchantmentCapacity(quality, level);
        const enchantments = this.generateEnchantments(quality, totalCapacity, state);

        // 计算已使用的容量（负面词条计算为-500）
        const usedCapacity = enchantments.reduce((total, enchantment) =>
            total + (enchantment.type === 'negative' ? -500 : this.calculateEnchantmentCost(enchantment)), 0);

        // 根据状态修改装备名称
        const equipmentName = state === 'normal' ?
            `${randomAdjective}的${randomNoun}` :
            `${EQUIPMENT_DATA.statePrefix[state]}${randomAdjective}的${randomNoun}`;

        return {
            id: Date.now(),
            name: equipmentName,
            adjective: randomAdjective,
            noun: randomNoun,
            quality,
            state,
            level,
            enchantments,
            enchantmentCapacity: totalCapacity,
            usedCapacity,
            timestamp: new Date().toLocaleTimeString()
        };
    }
} 