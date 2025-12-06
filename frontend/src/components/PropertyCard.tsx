"use client";

import { memo } from "react";

export interface Property {
    _id: string;
    name: string;
    location: string;
    district: string;
    price: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    description_th: string;
    description_en: string;
    features: string[];
    nearBts?: string;
    nearMrt?: string;
    imageUrl?: string;
}

interface PropertyCardProps {
    property: Property;
    compact?: boolean;
    onClick?: (property: Property) => void;
}

export const PropertyCard = memo(function PropertyCard({
    property,
    compact = false,
    onClick,
}: PropertyCardProps) {
    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `฿${(price / 1000000).toFixed(1)}M`;
        }
        return `฿${price.toLocaleString()}`;
    };

    const getPropertyTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case "condo":
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                    </svg>
                );
            case "house":
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                );
            case "villa":
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L4 9v12h16V9l-8-6zm6 16h-3v-5H9v5H6v-9l6-4.5 6 4.5v9z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z" />
                    </svg>
                );
        }
    };

    if (compact) {
        return (
            <div
                className="flex items-center p-3 bg-white dark:bg-thai-royal-blue/30 rounded-xl border border-thai-gold/20 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onClick?.(property)}
            >
                {/* Property Image or Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-thai-gold/20 to-thai-royal-blue/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {property.imageUrl ? (
                        <img
                            src={property.imageUrl}
                            alt={property.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-thai-gold">{getPropertyTypeIcon(property.type)}</span>
                    )}
                </div>

                {/* Info */}
                <div className="ml-3 flex-1 min-w-0">
                    <h4 className="font-medium text-thai-royal-blue-dark dark:text-thai-cream truncate">
                        {property.name}
                    </h4>
                    <p className="text-sm text-thai-royal-blue/60 dark:text-thai-cream/60 truncate">
                        {property.district}, {property.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-thai-gold">
                            {formatPrice(property.price)}
                        </span>
                        <span className="text-xs text-thai-royal-blue/40 dark:text-thai-cream/40">
                            {property.bedrooms}BR · {property.area}sqm
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-white dark:bg-thai-royal-blue/30 rounded-2xl border border-thai-gold/20 shadow-md hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
            onClick={() => onClick?.(property)}
        >
            {/* Property Image */}
            <div className="relative h-48 bg-gradient-to-br from-thai-gold/20 to-thai-royal-blue/20 overflow-hidden">
                {property.imageUrl ? (
                    <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-thai-gold/50">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-thai-royal-blue/90 text-white text-xs font-medium rounded-full flex items-center gap-1.5">
                    {getPropertyTypeIcon(property.type)}
                    <span className="capitalize">{property.type}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-thai-gold text-white font-bold rounded-lg shadow-lg">
                    {formatPrice(property.price)}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-thai-royal-blue-dark dark:text-thai-cream mb-1 line-clamp-1">
                    {property.name}
                </h3>

                <p className="text-sm text-thai-royal-blue/60 dark:text-thai-cream/60 flex items-center gap-1 mb-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {property.district}, {property.location}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-thai-royal-blue/70 dark:text-thai-cream/70 mb-3">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
                        </svg>
                        {property.bedrooms} BR
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm0 10H3v-3h4v3zm0-5H3V9h4v3zm5 5H8v-3h4v3zm0-5H8V9h4v3zm5 5h-4v-3h4v3zm0-5h-4V9h4v3zm3-7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2z" />
                        </svg>
                        {property.bathrooms} BA
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                        </svg>
                        {property.area} sqm
                    </span>
                </div>

                {/* Transit */}
                {(property.nearBts || property.nearMrt) && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {property.nearBts && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                </svg>
                                BTS {property.nearBts}
                            </span>
                        )}
                        {property.nearMrt && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-6H6V6h5v5zm2 0V6h5v5h-5zm3.5 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                </svg>
                                MRT {property.nearMrt}
                            </span>
                        )}
                    </div>
                )}

                {/* Features */}
                {property.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {property.features.slice(0, 3).map((feature, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-thai-gold/10 text-thai-gold-dark text-xs rounded-full"
                            >
                                {feature}
                            </span>
                        ))}
                        {property.features.length > 3 && (
                            <span className="px-2 py-0.5 text-thai-royal-blue/50 text-xs">
                                +{property.features.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

// Property list component
interface PropertyListProps {
    properties: Property[];
    compact?: boolean;
    onPropertyClick?: (property: Property) => void;
}

export function PropertyList({
    properties,
    compact = false,
    onPropertyClick,
}: PropertyListProps) {
    if (properties.length === 0) {
        return (
            <div className="text-center py-8 text-thai-royal-blue/50 dark:text-thai-cream/50">
                <svg
                    className="w-12 h-12 mx-auto mb-3 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                <p>ไม่พบอสังหาริมทรัพย์</p>
                <p className="text-sm">No properties found</p>
            </div>
        );
    }

    if (compact) {
        return (
            <div className="space-y-2">
                {properties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        compact
                        onClick={onPropertyClick}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
                <PropertyCard
                    key={property._id}
                    property={property}
                    onClick={onPropertyClick}
                />
            ))}
        </div>
    );
}

